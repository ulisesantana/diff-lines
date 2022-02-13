const { LineListRepository } = require('../../line-list/infrastructure/line-list.repository')
const { ReportRepository } = require('../infrastructure/report.repository')
const { Report } = require('../domain/report')

class GenerateReportCase {
  /** @type {LineListRepository} */
  #lineListRepository
  /** @type {ReportRepository} */
  #reportRepository

  constructor (
    lineListRepository = new LineListRepository(),
    reportRepository = new ReportRepository()
  ) {
    this.#lineListRepository = lineListRepository
    this.#reportRepository = reportRepository
  }

  /**
   *
   * @param {Object} input
   * @param {string} input.filePath1
   * @param {string} input.filePath2
   * @param {boolean} input.unique
   * @param {boolean} input.common
   * @param {string} input.outputFile
   * @returns {Promise<void>}
   */
  async execute ({ filePath1, filePath2, outputFile, ...options }) {
    const [lineList1, lineList2] = await Promise.all([
      this.#lineListRepository.read(filePath1),
      this.#lineListRepository.read(filePath2)
    ])
    const report = new Report(lineList1, lineList2)

    await this.#reportRepository.write(
      outputFile,
      GenerateReportCase.#getReportGenerator(report, options)
    )
  }

  /**
   *
   * @param {Report} report
   * @param {Object} options
   * @param {boolean} options.unique
   * @param {boolean} options.common
   * @returns {Generator}
   */
  static #getReportGenerator (report, { unique, common }) {
    if (unique && !common) {
      return report.getUniqueLines.bind(report)
    }
    if (!unique && common) {
      return report.getCommonLines.bind(report)
    }
    return report.getFullReport.bind(report)
  }
}

module.exports = { GenerateReportCase }
