import { formatDate_Part1, formatDate_Part2 } from '../../Chapter_1/exam_1_6'

describe('Chapter 1: exam 1.6', () => {
  it('formatDate Part 1 formats correctly', () => {
    const d = new Date('Tue Aug 02 2022 15:15:55 GMT+0300 (Eastern European Summer Time)')
    expect(formatDate_Part1(d, 'YYYY-MM-DD HH:mm:ss M D H, m s A a')).toBe(
      '2022-08-02 15:15:55 8 2 15, 15 55 PM pm'
    )
  })
  it('formatDate Part 2 formats correctly', () => {
    const d = new Date('Tue Aug 02 2022 15:15:55 GMT+0300 (Eastern European Summer Time)')
    expect(
      formatDate_Part2(d, 'YYYY-MM-DD HH:mm:ss M D H, m s A a, MMMM MMM; dddd ddd Do, WW W Wo E Q')
    ).toBe('2022-08-02 15:15:55 8 2 15, 15 55 PM pm, August Aug; Wednesday Wed 2nd, 31 31 31st 3 3')

    const d1 = new Date('Tue Oct 03 2022 05:15:55 GMT+0300 (Eastern European Summer Time)')
    expect(formatDate_Part2(d1, 'Do Wo Aa')).toBe('3rd 40th AMam')
  })
})
