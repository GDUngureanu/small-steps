/* eslint-env node */
/* eslint no-console: "off" */
import process from 'node:process'
import { readFile } from 'fs/promises'
import fg from 'fast-glob'
import { parse as parseJS } from '@babel/parser'
import { parse as parseSFC } from '@vue/compiler-sfc'

const files = await fg([
  '**/*.js',
  '**/*.vue',
  '!node_modules/**',
  '!dist/**',
  '!scripts/**',
  '!tests/**',
])

const genericNames = new Set(['data', 'item', 'items', 'obj', 'arr', 'val', 'tmp', 'foo', 'bar', 'baz'])
const allowedNames = new Set(['L', '_'])
const problems = []

for (const file of files) {
  const content = await readFile(file, 'utf8')
  let code = content
  if (file.endsWith('.vue')) {
    const { descriptor } = parseSFC(content)
    code = ''
    if (descriptor.script) code += descriptor.script.content + '\n'
    if (descriptor.scriptSetup) code += descriptor.scriptSetup.content
    if (!code.trim()) continue
  }
  let ast
  try {
    ast = parseJS(code, {
      sourceType: 'module',
      ecmaVersion: 'latest',
      allowAwaitOutsideFunction: true,
      plugins: ['jsx']
    })
  } catch (e) {
    console.error(`Failed to parse ${file}:`, e.message)
    continue
  }
  traverse(ast, (node) => {
    if (node.type === 'VariableDeclarator') {
      collectNames(node.id, file, problems)
    } else if (
      node.type === 'FunctionDeclaration' ||
      node.type === 'FunctionExpression' ||
      node.type === 'ArrowFunctionExpression' ||
      node.type === 'ObjectMethod' ||
      node.type === 'ClassMethod' ||
      node.type === 'ClassPrivateMethod'
    ) {
      for (const param of node.params) collectNames(param, file, problems)
    } else if (node.type === 'CatchClause' && node.param) {
      collectNames(node.param, file, problems)
    }
  })
}

if (problems.length) {
  console.error('Non-verbose variable names found:')
  for (const p of problems) {
    console.error(`${p.file}:${p.line} - ${p.name}`)
  }
  process.exitCode = 1
} else {
  console.log('All variable names appear verbose.')
}

function collectNames(pattern, file, out) {
  if (!pattern) return
  if (pattern.type === 'Identifier') {
    const name = pattern.name
    const line = pattern.loc?.start.line ?? 0
    if ((name.length < 3 || genericNames.has(name)) && !allowedNames.has(name)) {
      out.push({ file, line, name })
    }
  } else if (pattern.type === 'ObjectPattern') {
    for (const prop of pattern.properties) {
      if (prop.type === 'RestElement') collectNames(prop.argument, file, out)
      else collectNames(prop.value || prop.key, file, out)
    }
  } else if (pattern.type === 'ArrayPattern') {
    for (const element of pattern.elements) collectNames(element, file, out)
  } else if (pattern.type === 'AssignmentPattern') {
    collectNames(pattern.left, file, out)
  } else if (pattern.type === 'RestElement') {
    collectNames(pattern.argument, file, out)
  }
}

function traverse(node, visitor) {
  visitor(node)
  for (const key of Object.keys(node)) {
    if (key === 'loc' || key === 'start' || key === 'end') continue
    const child = node[key]
    if (Array.isArray(child)) {
      for (const c of child) if (c && typeof c.type === 'string') traverse(c, visitor)
    } else if (child && typeof child.type === 'string') {
      traverse(child, visitor)
    }
  }
}
