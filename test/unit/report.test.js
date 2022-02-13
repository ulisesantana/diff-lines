const { Report } = require('../../src/report/domain/report')
const { LineList } = require('../../src/line-list/domain/line-list')
const { EOL } = require('os')

describe('Report should', () => {
  const report = new Report(
    new LineList('a.txt', `one${EOL}two${EOL}three${EOL}four`),
    new LineList('b.txt', `four${EOL}two${EOL}six`)
  )
  const expectedUniqueLinesReport = `Unique lines (2) from a.txt and b.txt:
one
three

Unique lines (1) from b.txt and a.txt:
six

`
  const expectedCommonLinesReport = `Common lines (2) from a.txt and b.txt:
two
four

`
  const expectedFullReport = expectedUniqueLinesReport + expectedCommonLinesReport

  it('generate a text report with unique lines', () => {
    const uniqueLinesReport = getReportResult(report.getUniqueLines())
    expect(uniqueLinesReport).toBe(expectedUniqueLinesReport)
  })
  it('generate a text report with common lines', () => {
    const commonLinesReport = getReportResult(report.getCommonLines())
    expect(commonLinesReport).toBe(expectedCommonLinesReport)
  })
  it('generate a text report with common and unique lines', () => {
    const fullReport = getReportResult(report.getFullReport())
    expect(fullReport).toBe(expectedFullReport)
  })
})

function getReportResult (generator, result = '') {
  const { value, done } = generator.next()
  if (done) {
    return result
  }
  return getReportResult(generator, result + value)
}
