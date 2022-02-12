const fs = require('fs/promises')
const { LineList } = require('../domain/line-list')
const path = require('path')

class LineListRepository {
  #fs
  constructor (fileSystem = fs) {
    this.#fs = fileSystem
  }

  /**
   * Read lines from a file
   * @param {string} filePath - The file path
   * @return {Promise<LineList>}
   */
  async read (filePath) {
    const rawText = await this.#fs.readFile(filePath)
    return new LineList(path.basename(filePath), rawText.toString())
  }
}

module.exports = {
  LineListRepository
}
