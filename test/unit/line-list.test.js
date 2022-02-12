const { EOL } = require('os')
const { LineList } = require('../../src/line-list/domain/line-list')

describe('Line list should', () => {
  it('be created breaking down line breaks into a list', () => {
    const lineList = new LineList('irrelevant', `one${EOL}two${EOL}three`)
    expect(lineList.id).toBe('irrelevant')
    expect(lineList.values).toEqual(['one', 'two', 'three'])
  })

  it('extract unique values based on another line list', () => {
    const lineList1 = new LineList('irrelevant', `one${EOL}two${EOL}three`)
    const lineList2 = new LineList('irrelevant', `one${EOL}two`)

    expect(lineList1.getUniqueValues(lineList2)).toEqual(['three'])
  })

  it('extract common values based on another line list', () => {
    const lineList1 = new LineList('irrelevant', `one${EOL}two${EOL}three`)
    const lineList2 = new LineList('irrelevant', `one${EOL}two`)

    expect(lineList1.getCommonValues(lineList2)).toEqual(['one', 'two'])
  })
})
