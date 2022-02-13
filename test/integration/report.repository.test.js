const { EOL } = require('os')
const fs = require('fs/promises')
const { ReportRepository } = require('../../src/report/infrastructure/report.repository')

describe('Report repository should', () => {
  const outputFile = './report.repository.test.txt'

  afterAll(async () => {
    await fs.rm(outputFile)
  })

  it('persist report in a file', async () => {
    await new ReportRepository().write(outputFile, function * () {
      yield `irrelevant${EOL}`
      yield `more irrelevant${EOL}`
    })

    const fileContent = await fs.readFile(outputFile)
    expect(fileContent.toString()).toBe(`irrelevant${EOL}more irrelevant${EOL}`)
  })
})
