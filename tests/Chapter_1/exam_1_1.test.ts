import { countOdd } from '../../Chapter_1/exam_1_1'

describe('Chapter 1: exam 1.1 ', () => {
  it('countOdd counts odd correctly', () => {
    expect(countOdd([5, 9, 0, -33])).toBe(3)
    expect(countOdd([])).toBe(0)
    expect(countOdd([1, 1, 1, 1])).toBe(4)
  })
})
