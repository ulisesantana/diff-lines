const { EOL } = require('os')

class Report {
  /** @type {LineList} */
  #firstLineList
  /** @type {LineList} */
  #secondLineList

  /**
   * @param {LineList} firstLineList
   * @param {LineList} secondLineList
   */
  constructor (firstLineList, secondLineList) {
    this.#firstLineList = firstLineList
    this.#secondLineList = secondLineList
  }

  * getFullReport () {
    yield Report.#generateReportForUniqueLines(this.#firstLineList, this.#secondLineList)
    yield Report.#generateReportForUniqueLines(this.#secondLineList, this.#firstLineList)
    yield this.#generateReportForCommonLines()
  }

  * getUniqueLines () {
    yield Report.#generateReportForUniqueLines(this.#firstLineList, this.#secondLineList)
    yield Report.#generateReportForUniqueLines(this.#secondLineList, this.#firstLineList)
  }

  * getCommonLines () {
    yield this.#generateReportForCommonLines()
  }

  /**
   * @param {LineList} firstLineList
   * @param {LineList} secondLineList
   * @returns {string}
   */
  static #generateReportForUniqueLines (firstLineList, secondLineList) {
    const uniqueLines = firstLineList.getUniqueValues(secondLineList)
    const fileName = `${firstLineList.id} and ${secondLineList.id}`
    return Report.#generateReportText('Unique', fileName, uniqueLines)
  }

  /**
   * @returns {string}
   */
  #generateReportForCommonLines () {
    const commonLines = this.#firstLineList.getCommonValues(this.#secondLineList)
    const fileName = `${this.#firstLineList.id} and ${this.#secondLineList.id}`
    return Report.#generateReportText('Common', fileName, commonLines)
  }

  /**
   * @param {string} kind
   * @param {string} fileName
   * @param {string[]} fields
   * @returns {string}
   */
  static #generateReportText (kind, fileName, fields) {
    return `${kind} lines (${fields.length}) from ${fileName}:${EOL}` + fields.join(EOL).concat(EOL + EOL)
  }
}

module.exports = { Report }
