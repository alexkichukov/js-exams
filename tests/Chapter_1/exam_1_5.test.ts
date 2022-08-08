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
    isReady: true,
    experience: { count: 5 },
    date: new Date()
  }

  it('getWeight Part 1 calculates correct weight', () => {
    // Should be a shallow search
    expect(getWeight_Part1(input)).toBe(67)
    // Works for non objects passed too
    expect(getWeight_Part1(['hello', 123])).toBe(10)
  })
  
  it('getWeight Part 2 calculates correct weight', () => {
    // Should be a deep search
    expect(getWeight_Part2(input)).toBe(79)
    // Works for non objects passed too
    expect(getWeight_Part2(['hello', 123])).toBe(22)
  })
})
