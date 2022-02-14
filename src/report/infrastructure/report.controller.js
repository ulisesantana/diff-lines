const { GenerateReportCase } = require('../application/generate-report.case')
const path = require('path')

class ReportController {
  /** @type {GenerateReportCase} */
  #generateReportUseCase
  constructor (generateReportUseCase = new GenerateReportCase()) {
    this.#generateReportUseCase = generateReportUseCase
  }

  async generateReport ({ unique, common, output, args: [filePath1, filePath2] }) {
    try {
      if (!filePath1 || !filePath2) {
        throw new Error('2 file paths are required for lines comparison.')
      }
      const outputFile = output || ReportController.#generateOutputFilename(filePath1, filePath2, unique, common)
      await this.#generateReportUseCase.execute({
        filePath1,
        filePath2,
        unique,
        common,
        outputFile
      })
      console.log(`Report generated successfully. You can see the result at ${outputFile}`)
    } catch (err) {
      console.error(err.toString())
      console.error('Error generating report. See more info above.')
    }
  }

  static #generateOutputFilename (file1, file2, unique, common) {
    const kind = unique && !common
      ? 'unique'
      : !unique && common
          ? 'common'
          : 'full'
    return `${kind}-${path.basename(file1, path.extname(file1))}-${path.basename(file2, path.extname(file2))}.txt`
  }
}

module.exports = {
  ReportController
}
