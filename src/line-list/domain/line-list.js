const { EOL } = require('os')

class LineList {
  /** @type {string} */
  #id
  /** @type {string[]} */
  #values

  /**
   * @param {string} id - Line list identifier (file basename could be a good option)
   * @param {string} raw - Raw text
   */
  constructor (id, raw) {
    this.#id = id
    this.#values = raw.split(EOL).map(LineList.#cleanLine)
  }

  get id () {
    return this.#id
  }

  get values () {
    return this.#values
  }

  /**
   * Extract unique lines comparing with the given line list.
   * @param {LineList} lines - Lines to compare with.
   * @return {string[]}
   */
  getUniqueValues (lines) {
    return this.values.filter(line => !lines.values.includes(line))
  }

  /**
   * Extract common lines comparing with the given line list.
   * @param {LineList} lines - Lines to compare with.
   * @return {string[]}
   */
  getCommonValues (lines) {
    return this.values.filter(line => lines.values.includes(line))
  }

  /**
   * @param {string} line
   */
  static #cleanLine (line) {
    return line.trim()
  }
}

module.exports = { LineList }
