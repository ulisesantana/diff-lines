#!/usr/bin/env node

const { getopt } = require('stdio')
const { ReportController } = require('../src/report/infrastructure/report.controller')

const options = getopt({
  common: { key: 'c', description: 'Generate report with common values', args: 0 },
  output: { key: 'o', description: 'File where the report will be written', default: '', args: 1 },
  unique: { key: 'u', description: 'Generate report with unique values', args: 0 }
})

new ReportController().generateReport(options).catch(console.error)
