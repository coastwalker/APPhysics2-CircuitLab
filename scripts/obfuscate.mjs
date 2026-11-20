import fs from 'node:fs'
import path from 'node:path'
import JavaScriptObfuscator from 'javascript-obfuscator'

const assetsDir = path.resolve(process.cwd(), 'dist', 'assets')

if (!fs.existsSync(assetsDir)) {
  console.error('dist/assets directory not found. Run vite build first.')
  process.exit(1)
}

const files = fs.readdirSync(assetsDir).filter((f) => f.endsWith('.js'))

for (const file of files) {
  // Skip large third-party vendor libraries (react, katex, lucide-react) to keep bundle fast
  if (file.startsWith('vendor-')) {
    console.log(`[skip vendor] ${file}`)
    continue
  }

  const fullPath = path.join(assetsDir, file)
  const code = fs.readFileSync(fullPath, 'utf8')
  const isAuthChunk = file.startsWith('auth-')

  // High-strength Obfuscator.io preset for auth chunk; balanced-strong preset for main app chunk
  const options = isAuthChunk
    ? {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.85,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        identifierNamesGenerator: 'hexadecimal',
        numbersToExpressions: true,
        renameGlobals: false,
        simplify: true,
        splitStrings: true,
        splitStringsChunkLength: 5,
        stringArray: true,
        stringArrayCallsTransform: true,
        stringArrayCallsTransformThreshold: 0.85,
        stringArrayEncoding: ['rc4'],
        stringArrayIndexShift: true,
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayWrappersCount: 2,
        stringArrayWrappersChainedCalls: true,
        stringArrayWrappersType: 'function',
        stringArrayThreshold: 1,
        transformObjectKeys: true,
        unicodeEscapeSequence: true,
      }
    : {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayRotate: true,
        stringArrayShuffle: true,
        stringArrayThreshold: 0.75,
        unicodeEscapeSequence: false,
      }

  const result = JavaScriptObfuscator.obfuscate(code, options)
  fs.writeFileSync(fullPath, result.getObfuscatedCode(), 'utf8')
  const sizeKb = (fs.statSync(fullPath).size / 1024).toFixed(1)
  console.log(`[obfuscated${isAuthChunk ? ' HIGH' : ''}] ${file} (${sizeKb} kB)`)
}
