/* eslint-disable @typescript-eslint/no-var-requires */
const { readFileSync, writeFileSync } = require('fs')

// determine shield URL
const reportFile = './coverage/coverage-summary.json'
const report = JSON.parse(readFileSync(reportFile, 'utf-8'))
const coverage = report.total.statements.pct
const color = coverage < 80 ? 'red' : coverage < 90 ? 'yellow' : 'brightgreen'
const shieldUrl = `https://img.shields.io/badge/coverage-${coverage}${encodeURI('%')}-${color}.svg`

// update README.md with shield URL
const readme = readFileSync('./README.md', 'utf-8')
const updatedReadme = readme.replace(
  new RegExp('^\\[coverage-image\\]:.*$', 'gm'), 
  `[coverage-image]: ${shieldUrl}`)
writeFileSync('./README.md', updatedReadme, 'utf-8')
