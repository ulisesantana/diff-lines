const { EOL } = require('os')
const { LineListRepository } = require('../../src/line-list/infrastructure/line-list.repository')

describe('Line list repository should', () => {
  it('read a file and return a LineList', async () => {
    const filePath = './irrelevant/file.txt'
    const fsMock = {
      readFile: jest.fn(async () => Buffer.from(`one${EOL}two${EOL}three`))
    }

    const lineList = await new LineListRepository(fsMock).read(filePath)

    expect(fsMock.readFile).toHaveBeenCalledWith(filePath)
    expect(lineList.id).toBe('file.txt')
    expect(lineList.values).toEqual(['one', 'two', 'three'])
  })

  it('throw an error if file not exists', async () => {
    await expect(async () => { await new LineListRepository().read('not-exists.txt') })
      .rejects.toThrow("ENOENT: no such file or directory, open 'not-exists.txt'")
  })
})
