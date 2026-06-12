#!/usr/bin/env node

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import readline from 'readline'
import process from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = __dirname

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function exec(command, options = {}) {
  try {
    log(`Running: ${command}`, 'cyan')
    execSync(command, {
      stdio: 'inherit',
      cwd: rootDir,
      ...options
    })
    return true
  } catch (error) {
    log(`Command failed: ${command}`, 'red')
    log(`Exit code: ${error.status}`, 'red')
    return false
  }
}

function readPackageJson() {
  const packagePath = join(rootDir, 'package.json')
  return JSON.parse(readFileSync(packagePath, 'utf8'))
}

function writePackageJson(packageJson) {
  const packagePath = join(rootDir, 'package.json')
  writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n')
}

function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

function askYesNo(question) {
  return askQuestion(question).then((answer) => {
    const normalized = answer.trim().toLowerCase()
    return normalized === 'y' || normalized === 'yes'
  })
}

function execOutput(command) {
  return execSync(command, { cwd: rootDir, encoding: 'utf8' }).trim()
}

function tagExists(tag) {
  try {
    execSync(`git rev-parse -q --verify "refs/tags/${tag}"`, {
      cwd: rootDir,
      stdio: 'pipe'
    })
    return true
  } catch {
    return false
  }
}

async function createAndPushTag(version) {
  const tag = `v${version}`

  if (tagExists(tag)) {
    log(`❌ Tag ${tag} already exists locally.`, 'red')
    return false
  }

  const status = execOutput('git status --porcelain')
  if (status) {
    const packageChanges = execOutput(
      'git status --porcelain package.json package-lock.json'
    )

    if (packageChanges) {
      log('\n📝 Committing version bump...', 'yellow')
      if (!exec('git add package.json package-lock.json')) return false
      if (!exec(`git commit -m "Release ${tag}"`)) return false
      log('✅ Version bump committed!', 'green')
    }

    const otherChanges = status
      .split('\n')
      .filter(
        (line) =>
          line &&
          !line.endsWith(' package.json') &&
          !line.endsWith(' package-lock.json')
      )

    if (otherChanges.length > 0) {
      log(
        '⚠️  Other uncommitted changes remain and were not included in the tag commit.',
        'yellow'
      )
    }
  }

  log(`\n🏷️  Creating tag ${tag}...`, 'yellow')
  if (!exec(`git tag -a ${tag} -m "Release ${tag}"`)) return false
  log(`✅ Tag ${tag} created!`, 'green')

  log('\n📤 Pushing commits and tag to remote...', 'yellow')
  if (!exec('git push')) return false
  if (!exec(`git push origin ${tag}`)) return false
  log(`✅ Tag ${tag} pushed to remote!`, 'green')

  return true
}

function validateVersion(currentVersion, newVersion) {
  // Check if version format is valid (x.y.z)
  const versionRegex = /^\d+\.\d+\.\d+$/
  if (!versionRegex.test(newVersion)) {
    log('❌ Invalid version format. Please use format: x.y.z (e.g., 1.0.1)', 'red')
    return null
  }

  const [major1, minor1, patch1] = currentVersion.split('.').map(Number)
  const [major2, minor2, patch2] = newVersion.split('.').map(Number)

  // Check if new version is greater than current
  if (major2 > major1) return 'major'
  if (major2 === major1 && minor2 > minor1) return 'minor'
  if (major2 === major1 && minor2 === minor1 && patch2 > patch1) return 'patch'

  log('❌ New version must be greater than current version', 'red')
  log(`   Current: ${currentVersion}`, 'yellow')
  log(`   New:     ${newVersion}`, 'yellow')
  return null
}

async function main() {
  log('🚀 Starting release process...', 'bright')

  // Step 1: Run tests
  log('\n📋 Step 1: Running tests...', 'yellow')
  if (!exec('npm test')) {
    log('❌ Tests failed. Aborting release.', 'red')
    process.exit(1)
  }
  log('✅ Tests passed!', 'green')

  // Step 2: Build the project
  log('\n🔨 Step 2: Building project...', 'yellow')

  // Then build
  if (!exec('npm run build')) {
    log('❌ Build failed. Aborting release.', 'red')
    process.exit(1)
  }
  log('✅ Build successful!', 'green')

  // Step 3: Confirm documentation update
  log('\n📚 Step 3: Documentation update confirmation...', 'yellow')
  log('   Please ensure you have updated the documentation before proceeding.', 'cyan')

  let docConfirmed = false
  do {
    const docAnswer = await askQuestion('Have you updated the documentation? (y/n): ')
    docConfirmed = docAnswer.toLowerCase() === 'y' || docAnswer.toLowerCase() === 'yes'

    if (!docConfirmed) {
      log('❌ Please update the documentation before continuing with the release.', 'red')
      log('   You can run: npm run build:docs', 'cyan')
    }
  } while (!docConfirmed)

  log('✅ Documentation update confirmed!', 'green')

  // Step 4: Get current version and ask for new version
  const packageJson = readPackageJson()
  const currentVersion = packageJson.version

  log(`\n📦 Current version: ${currentVersion}`, 'blue')
  log('   Format: x.y.z (e.g., 1.0.1, 1.1.0, 2.0.0)', 'cyan')

  let newVersion
  let versionType

  do {
    newVersion = await askQuestion(`Enter new version (current: ${currentVersion}): `)
    versionType = validateVersion(currentVersion, newVersion)
  } while (!versionType)

  log(`\n🔄 Step 4: Updating version from ${currentVersion} to ${newVersion} (${versionType} release)...`, 'yellow')

  // Update package.json
  packageJson.version = newVersion
  writePackageJson(packageJson)
  log('✅ Package.json updated!', 'green')

  // Update package-lock.json to match the new version
  log('Updating package-lock.json...', 'cyan')
  if (!exec('npm install --package-lock-only')) {
    log('❌ Failed to update package-lock.json. Aborting release.', 'red')
    process.exit(1)
  }
  log('✅ Package-lock.json updated!', 'green')

  // Step 5: Ensure NPM authentication
  // Note: `npm publish` performs its own auth flow, so running an explicit
  // `npm login` beforehand causes you to sign in twice. We only check whether
  // you're already authenticated and let `npm publish` handle login if needed.
  log('\n🔐 Step 5: Checking NPM authentication...', 'yellow')
  let npmUser = ''
  try {
    npmUser = execSync('npm whoami', { cwd: rootDir }).toString().trim()
  } catch {
    npmUser = ''
  }

  if (npmUser) {
    log(`✅ Already logged in to NPM as ${npmUser}`, 'green')
  } else {
    log('ℹ️  Not logged in. `npm publish` will prompt you to authenticate.', 'cyan')
  }

  // Step 6: NPM publish (handles authentication if not already logged in)
  log('\n📤 Step 6: Publishing to NPM...', 'yellow')
  if (!exec('npm publish')) {
    log('❌ NPM publish failed. Aborting release.', 'red')
    process.exit(1)
  }
  log('✅ Package published to NPM!', 'green')

  log('\n🎉 Release completed successfully!', 'bright')
  log(`📦 Version ${newVersion} is now published on NPM`, 'green')
  log(`🔗 Package: https://www.npmjs.com/package/${packageJson.name}`, 'blue')

  // Step 7: Optional git tag and push
  log('\n🏷️  Step 7: Git tag (optional)...', 'yellow')
  const shouldTag = await askYesNo(
    `Would you like to create and push git tag v${newVersion}? (y/n): `
  )

  if (shouldTag) {
    if (!(await createAndPushTag(newVersion))) {
      log('❌ Git tag step failed. You can tag and push manually.', 'red')
      process.exit(1)
    }
  } else {
    log('ℹ️  Skipped git tag. You can tag and push manually when ready.', 'cyan')
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  log(`❌ Unhandled error: ${error}`, 'red')
  process.exit(1)
})

// Run the release script
main().catch((error) => {
  log(`❌ Release failed: ${error}`, 'red')
  process.exit(1)
})
