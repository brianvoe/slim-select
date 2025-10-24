import hljs from 'highlight.js/lib/core'

// Import only the languages we actually use
import javascript from 'highlight.js/lib/languages/javascript'
import html from 'highlight.js/lib/languages/xml' // HTML is part of XML
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'

// Register the languages
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('html', html)
hljs.registerLanguage('css', css)
hljs.registerLanguage('bash', bash)

// Configure Highlight.js options
hljs.configure({
  languages: ['javascript', 'html', 'css', 'bash']
})

// Supported languages
const SUPPORTED_LANGUAGES = ['javascript', 'html', 'css', 'bash']

/**
 * Highlight.js utility for syntax highlighting
 */
export class HighlightService {
  /**
   * Highlight all code blocks on the page
   */
  static highlightAll(): void {
    const codeBlocks = document.querySelectorAll('pre code[class*="language-"]')

    for (const block of Array.from(codeBlocks)) {
      // Trim left indent before highlighting
      this.trimLeftIndent(block as HTMLElement)
      this.highlightElement(block as HTMLElement)
    }
  }

  /**
   * Highlight a specific element
   */
  static highlightElement(element: HTMLElement): void {
    const language = this.getLanguageFromElement(element)

    try {
      // Only highlight if we support the language
      if (SUPPORTED_LANGUAGES.includes(language)) {
        hljs.highlightElement(element)
      }
    } catch (error) {
      console.warn(`Failed to highlight ${language}:`, error)
    }
  }

  /**
   * Get the language from an element's class name
   */
  private static getLanguageFromElement(element: HTMLElement): string {
    const match = element.className.match(/language-(\w+)/)
    return match ? match[1] : 'text'
  }

  /**
   * Check if a language is supported
   */
  static isLanguageSupported(language: string): boolean {
    return SUPPORTED_LANGUAGES.includes(language)
  }

  /**
   * Get list of supported languages
   */
  static getSupportedLanguages(): string[] {
    return [...SUPPORTED_LANGUAGES]
  }

  /**
   * Trim left indent from code blocks
   * This removes the indentation that comes from VS Code/editor tabs
   */
  private static trimLeftIndent(element: HTMLElement): void {
    const originalText = element.textContent || ''
    element.textContent = this.trimLeftIndentFromString(originalText)
  }

  /**
   * Trim left indent from a string
   */
  private static trimLeftIndentFromString(code: string): string {
    // Split the code block into individual lines
    const lines = code.split('\n')

    // Find the minimum indent level for all lines that are not empty
    let minIndent = Infinity
    for (const line of lines) {
      if (line.trim().length === 0) continue // Skip empty lines

      const currentIndent = line.match(/^\s*/)?.[0].length || 0
      minIndent = Math.min(minIndent, currentIndent)
    }

    // If no valid indent found, return original
    if (minIndent === Infinity) return code

    // Remove the minimum indent from each line
    const trimmedLines = lines.map((line) => {
      if (line.trim().length === 0) return line // Keep empty lines as is
      return line.substring(minIndent)
    })

    // Join the lines back into a single string
    return trimmedLines.join('\n')
  }
}
