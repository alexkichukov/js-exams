import { countTypes } from '../../Chapter_1/exam_1_4'

describe('Chapter 1: exam 1.4', () => {
  it('countsTypes counts correct amount', () => {
    const input = [
      6,
      'Test',
      'value',
      1,
      undefined,
      null,
      false,
      () => {
        console.log('Hello,  world!')
      },
      { count: 5 },
      ['random', 'array'],
      new Date(),
      true
    ]

    expect(countTypes(input)).toEqual({
      nullCount: 1,
      objectsCount: 4,
      stringsCount: 2,
      numericsCount: 2,
      arraysCount: 1,
      undefinedCount: 1,
      datesCount: 1,
      booleansCount: 2,
      functions: 1,
    })
  })
})
