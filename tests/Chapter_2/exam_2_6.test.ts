import { removeInner } from '../../Chapter_2/exam_2_6'

describe('Chapter 2: exam 2.6', () => {
  it('removeInner works correctly', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const percentage = 50
    removeInner(arr, percentage)
    expect(arr).toEqual([1, 2, 9, 10])
  })
})
