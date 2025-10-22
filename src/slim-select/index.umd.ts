// UMD entry point - only exports the default SlimSelect class
// This avoids the mixed exports issue for UMD/IIFE builds
import SlimSelect, * as namedExports from './index'

// Attach all named exports as properties on the default export
Object.assign(SlimSelect, namedExports)

export default SlimSelect
