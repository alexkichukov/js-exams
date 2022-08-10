import * as exam_2_7 from '../../Chapter_2/exam_2_7'

describe('Chapter 2: exam 2.7', () => {
  it('randomize works correctly', () => {
    const arr = [1, 5, 8, 12, 15, 20, 27]

    // Check that it still has the same values (order is not important)
    expect(exam_2_7.randomize(arr).sort()).toEqual(arr.sort())
  })

  it('randomizeAndFindLongestSequence works correctly', () => {
    const randomizeMock = jest.spyOn(exam_2_7, 'randomize')
    randomizeMock.mockImplementation(() => [6, 8, 1, 4, 0, 5, 6, 7, 8, 1, 4])

    expect(exam_2_7.randomizeAndFindLongestSequence([0])).toEqual([0, 5, 6, 7, 8])
  })
})
