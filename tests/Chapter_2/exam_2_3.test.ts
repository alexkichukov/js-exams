import { appender_Part1, appender_Part2 } from '../../Chapter_2/exam_2_3'

describe('Chapter 2: exam 2.3 ', () => {
  it('appender Part 1 correctly appends only truthy values', () => {
    const arr: any[] = [1, undefined, [1, 2, 3], 'test', { name: 'John Doe' }]
    const arr2: any[] = [
      null,
      () => {
        console.log('Hello,  world!')
      },
      ['one', 'five'],
      undefined,
      6
    ]
    appender_Part1(arr, arr2)
    expect(JSON.stringify(arr)).toBe(
      JSON.stringify([
        1,
        undefined,
        [1, 2, 3],
        'test',
        { name: 'John Doe' },
        () => {
          console.log('Hello,  world!')
        },
        ['one', 'five'],
        6
      ])
    )
  })

  it('appender Part 2 correctly appends based on indexes', () => {
    const arr: any[] = [
      [1, 2, 3, 4],
      ['one', 'two'],
      [5, 6]
    ]
    const arr2: any[] = [
      null,
      () => {
        console.log('Hello,  world!')
      },
      ['one', 'five'],
      { role: 'admin' },
      { name: 'John' },
      [1000, 1001]
    ]
    appender_Part2(arr, arr2)
    expect(JSON.stringify(arr)).toBe(
      JSON.stringify([
        [1, 2, 3, 4, 'one', 'five', 1000, 1001],
        ['one', 'two', { role: 'admin' }, { name: 'John' }],
        [5, 6, 'one', 'five', 1000, 1001]
      ])
    )
  })
})
