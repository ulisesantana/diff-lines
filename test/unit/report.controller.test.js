const { ReportController } = require('../../src/report/infrastructure/report.controller')
describe('Report controller should', () => {
  const filePath1 = 'a.txt'
  const filePath2 = 'b.txt'

  beforeEach(() => {
    jest.clearAllMocks()
    console.log = jest.fn()
    console.error = jest.fn()
  })

  it('print success message', async () => {
    const outputFile = 'report.txt'
    const useCase = { execute: jest.fn() }
    const controller = new ReportController(useCase)

    await controller.generateReport({ args: [filePath1, filePath2], output: outputFile })

    expect(console.log).toHaveBeenCalledWith(`Report generated successfully. You can see the result at ${outputFile}`)
  })

  it('validate 2 file paths are given', async () => {
    await new ReportController().generateReport({ args: [] })

    expect(console.log).not.toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith('Error: 2 file paths are required for lines comparison.')
  })

  it.each([
    { test: 'full report', options: {}, expectedOutputFile: 'full-a-b' },
    { test: 'unique report', options: { unique: true }, expectedOutputFile: 'unique-a-b' },
    { test: 'common report', options: { common: true }, expectedOutputFile: 'common-a-b' }
  ])('if no output file name is given generate a default one for $test',
    async ({ options, expectedOutputFile }) => {
      const useCase = { execute: jest.fn() }
      const controller = new ReportController(useCase)

      await controller.generateReport({ args: [filePath1, filePath2], ...options })

      expect(useCase.execute).toHaveBeenCalledWith({
        filePath1,
        filePath2,
        outputFile: expectedOutputFile,
        ...options
      })
    })
})
