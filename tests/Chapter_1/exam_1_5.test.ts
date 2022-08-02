import { getWeight_Part1, getWeight_Part2 } from '../../Chapter_1/exam_1_5'

describe('Chapter 1: exam 1.5', () => {
  const input = {
    cards: 6,
    label: 'Test',
    description: 'value',
    type: 1,
    role: undefined,
    person: { name: 'John Doe' },
    skills: null,
    report: () => {
      console.log('Hello,  world!')
    },
    experience: { count: 5 }
  }

  it('getWeight Part 1 calculates correct weight', () => {
    expect(getWeight_Part1(input)).toBe(58)
  })

  it('getWeight Part 2 calculates correct weight', () => {
    expect(getWeight_Part2(input)).toBe(70)
  })
})
