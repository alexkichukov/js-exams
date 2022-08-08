import { findByWeight, allHigherThanWeight } from '../../Chapter_2/exam_2_8'

describe('Chapter 2: exam 2.8', () => {
  it('findByWeight works correctly', () => {
    const arr = [6, 'Test', 'value', 1, undefined, null, { name: 'john.doe', role: 'admim' }]
    expect(findByWeight(arr, 16)).toBe(true)
    expect(findByWeight(arr, 9999)).toBe(false)
  })
  it('allHigherThanWeight works correctly', () => {
    const arr = [6, 'Test', 'value', 1, undefined, null, { name: 'john.doe', role: 'admim' }]
    expect(allHigherThanWeight(arr, 2)).toBe(true)
    expect(allHigherThanWeight(arr, 8)).toBe(false)
  })
})
