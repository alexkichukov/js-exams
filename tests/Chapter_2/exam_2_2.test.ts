import {
  findObj_Part1,
  findObj_Part2,
  findObj_Part3,
  findObj_Part4
} from '../../Chapter_2/exam_2_2'

describe('Chapter 2: exam 2.2 ', () => {
  it('findObj Part 1 finds reference of object in array (not deep)', () => {
    const person = { name: 'John Doe' }
    const input = [6, 'Test', { name: 'John Doe' }, person]
    const input2 = [6, 'Test', { name: 'John Doe', person }]
    expect(findObj_Part1(input, person)).toBe(true)
    expect(findObj_Part1(input2, person)).toBe(false)
  })

  it('findObj Part 2 finds reference of object in array (deep)', () => {
    const person = { name: 'John Doe' }
    const input = [6, 'Test', { name: 'John Doe', person }]
    const input2 = [6, 'Test', { name: 'John Doe' }]

    expect(findObj_Part2(input, person)).toBe(true)
    expect(findObj_Part2(input2, person)).toBe(false)
  })

  it('findObj Part 3 finds object with same value in array (deep)', () => {
    const person = { name: 'John Doe', hello: { num: 1 } }
    const input = [
      6,
      { hello: 0 },
      { more: 5, evenMore: 10 },
      'Test',
      {
        huh: 50,
        deep: {
          em: 'John Doe',
          someNum: { aaaa: 1 }
        }
      }
    ]

    expect(findObj_Part3(input, person)).toBe(true)
  })

  it('findObj Part 4 finds object with same value or reference in array (deep)', () => {
    const person = { name: 'John Doe', age: 30 }
    const input = [
      6,
      'Test',
      { num: 30 },
      { deep: { name: 'John Doe', value: 50 } },
      { deep: { person }, other: 99 }
    ]

    expect(findObj_Part4(input, person)).toBe(true)
  })
})
