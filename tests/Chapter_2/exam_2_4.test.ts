import { sumOfHigherThan, arrOfDivisibleBy } from '../../Chapter_2/exam_2_4'

describe('Chapter 2: exam 2.4 ', () => {
  it('sumOfHigherThan returns the sum of elements higher than the parameter correctly', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    expect(sumOfHigherThan(arr, 4)).toBe(5+6+7)
  })

  it('arrOfDivisibleBy returns all divisble by parameter values correctly', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7]
    expect(arrOfDivisibleBy(arr, 2)).toEqual([2, 4, 6])
  })
})
