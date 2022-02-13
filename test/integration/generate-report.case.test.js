const fs = require('fs/promises')
const { GenerateReportCase } = require('../../src/report/application/generate-report.case')

describe('Generate Report Use Case should', () => {
  const outputDir = 'test/tmp'
  const filePath1 = 'test/fixtures/file-a.txt'
  const filePath2 = 'test/fixtures/file-b.txt'

  beforeAll(async () => {
    await fs.mkdir(outputDir)
  })

  afterAll(async () => {
    await fs.rm(outputDir, { recursive: true })
  })

  it('persist a full report with common and unique lines', async () => {
    const outputFile = `${outputDir}/full-report.txt`

    await new GenerateReportCase().execute({
      filePath1,
      filePath2,
      outputFile
    })

    const [result, expectedResult] = await Promise.all([
      fs.readFile(outputFile),
      fs.readFile('test/fixtures/full-report-a-b.txt')
    ])
    expect(result.toString()).toBe(expectedResult.toString())
  })

  it('persist a report with common lines only', async () => {
    const outputFile = `${outputDir}/common-report.txt`

    await new GenerateReportCase().execute({
      filePath1,
      filePath2,
      outputFile,
      common: true
    })

    const [result, expectedResult] = await Promise.all([
      fs.readFile(outputFile),
      fs.readFile('test/fixtures/common-report-a-b.txt')
    ])
    expect(result.toString()).toBe(expectedResult.toString())
  })

  it('persist a report with unique lines only', async () => {
    const outputFile = `${outputDir}/unique-report.txt`

    await new GenerateReportCase().execute({
      filePath1,
      filePath2,
      outputFile,
      unique: true
    })

    const [result, expectedResult] = await Promise.all([
      fs.readFile(outputFile),
      fs.readFile('test/fixtures/unique-report-a-b.txt')
    ])
    expect(result.toString()).toBe(expectedResult.toString())
  })
})
