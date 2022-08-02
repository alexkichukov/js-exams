import { bubbleSort } from '../../Chapter_1/exam_1_2'

describe('Chapter 1: exam 1.2', () => {
  it('bubbleSort correctly sorts number array', () => {
    expect(bubbleSort([5, 9, 0, -33])).toEqual([-33, 0, 5, 9])
    expect(bubbleSort([])).toEqual([])
    expect(bubbleSort([1, 1, 1, 1])).toEqual([1, 1, 1, 1])
  })
})
