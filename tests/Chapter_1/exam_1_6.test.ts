import { formatDate_Part1, formatDate_Part2 } from '../../Chapter_1/exam_1_6'

describe('Chapter 1: exam 1.6', () => {
  it('formatDate Part 1 formats correctly', () => {
    const d = new Date('Tue Aug 02 2022 15:15:55 GMT+0300 (Eastern European Summer Time)')
    expect(formatDate_Part1(d, 'YYYY-MM-DD HH:mm:ss')).toBe('2022-08-02 15:15:55')
  })
  it('formatDate Part 2 formats correctly', () => {
    const d = new Date('Tue Aug 02 2022 15:15:55 GMT+0300 (Eastern European Summer Time)')
    expect(formatDate_Part2(d, 'YYYY-MMMM-DD HH:mm:ss dddd, Wo')).toBe(
      '2022-August-02 15:15:55 Wednesday, 31st'
    )
  })
})
