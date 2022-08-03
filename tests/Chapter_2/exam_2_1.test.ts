import '../../Chapter_2/exam_2_1'

describe('Chapter 2: exam 2.1 ', () => {
  it('Array prototype bubblesort sorts correctly', () => {
    const test = [2, 0, 8, 1, 5, 3, 9, 12, 5]

    const comparer: (a: any, b: any) => number = (a, b) => {
      return a - b
    }

    test.bubbleSort(comparer)

    expect(test).toEqual([...test].sort(comparer))
  })

  it('Array prototype min-max sort sorts correctly', () => {
    const test = [2, 0, 8, 1, 5, 3, 9, 12, 5]

    const comparer: (a: any, b: any) => number = (a, b) => {
      return a - b
    }

    test.minMaxSort(comparer)

    expect(test).toEqual([...test].sort(comparer))
  })
})
