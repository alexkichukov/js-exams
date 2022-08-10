import '../../Chapter_3/exam_3_5'

describe('Chapter 3: exam 3.3', () => {
  it('Object deep copy works correctly', () => {
    const original = {
      hey: 'there',
      num: 5092,
      something: { test: true },
      arr: [
        {
          a: 'a',
          b: function () {
            console.log(this.a);
          }
        }
      ]
    };
    const copy = Object.deepCopy(original)

    expect(original).not.toBe(copy)
    expect(JSON.stringify(original)).toBe(JSON.stringify(copy))

    const one = {
      num: 123,
      greet: 'Hello'
    }
    const two = {
      isMonday: false,
      day: {
        id: 2,
        name: 'Wednesday'
      }
    }

    const copy2 = Object.deepCopy(one, two)
    expect(copy2).toEqual({
      num: 123,
      greet: 'Hello',
      isMonday: false,
      day: {
        id: 2,
        name: 'Wednesday'
      }
    })
  })
})
