/* eslint-env node */
/**
 * Custom ESLint formatter that outputs results in a wide-screen friendly format.
 * Lines and columns are padded so that messages align neatly when viewed on
 * wider terminals.
 *
 * @param {import('eslint').ESLint.LintResult[]} results
 * @returns {string}
 */
module.exports = (results) => {
  const lines = []

  for (const result of results) {
    if (result.messages.length === 0) continue

    lines.push(result.filePath)

    for (const msg of result.messages) {
      const line = String(msg.line).padStart(4)
      const column = String(msg.column).padStart(4)
      const type = msg.severity === 2 ? 'error' : 'warn'
      lines.push(`  ${line}:${column}  ${type.padEnd(5)}  ${msg.message}  ${msg.ruleId || ''}`.trimEnd())
    }

    lines.push('')
  }

  return lines.join('\n')
}
