const fs = require('fs')
const { pipeline } = require('stream/promises')

class ReportRepository {
  #fs
  constructor (fileSystem = fs) {
    this.#fs = fileSystem
  }

  /**
   * Persist a single or multiple reports in a file
   * @param {string} outputFile - output file where the report is
   * @param {Generator} input - Reports to be written
   * going to be written
   * @return {Promise<void>}
   */
  async write (outputFile, input) {
    await pipeline(
      input,
      this.#fs.createWriteStream(outputFile)
    )
  }
}

module.exports = {
  ReportRepository
}
