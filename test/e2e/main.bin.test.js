const util = require('util')
const { exec: execCallback } = require('child_process')
const fs = require('fs/promises')
const { existsSync } = require('fs')
const exec = util.promisify(execCallback)

describe('Main bin file should', () => {
  const outputDir = 'test/tmp'
  const filePath1 = 'test/fixtures/file-a.txt'
  const filePath2 = 'test/fixtures/file-b.txt'

  beforeAll(async () => {
    await fs.mkdir(outputDir)
  })

  afterAll(async () => {
    await fs.rm(outputDir, { recursive: true })
  })

  it('run successfully', async () => {
    const outputFile = `${outputDir}/full-report-bin.txt`
    const { stdout, stderr } = await exec(`node bin/main.js ${filePath1} ${filePath2} -o ${outputFile}`)

    expect(existsSync(outputFile)).toBeTruthy()
    expect(stdout).toContain(`Report generated successfully. You can see the result at ${outputFile}`)
    expect(stderr).toHaveLength(0)
  })

  it('show errors', async () => {
    const outputFile = `${outputDir}/error-bin.txt`
    const { stdout, stderr } = await exec(`node bin/main.js -o ${outputFile}`)

    expect(existsSync(outputFile)).toBeFalsy()
    expect(stdout).toHaveLength(0)
    expect(stderr.length).toBeGreaterThan(0)
  })
})
