import Color from '../../Chapter_3/exam_3_3'

describe('Chapter 3: exam 3.3', () => {
  it('Color class works correctly', () => {
    expect((new Color()).getColorRGB()).toBe('rgb(0, 0, 0)')
    expect((new Color(156, 245, 111, 0.5)).getColorRGB()).toBe('rgba(156, 245, 111, 0.5)')
    expect((new Color(156, 245, 111, 0.5)).getColorLongHex()).toBe('#9cf56f80')
    expect((new Color('#9e7')).getColorLongHex()).toBe('#99ee77')
    expect((new Color('#9cf56f', 0.5)).getColorShortHex()).toBe('#9e7')
    expect(new Color(30, 155, 201).getColorRGB()).toBe('rgb(30, 155, 201)')
    expect(new Color(30, 155, 201).getColorLongHex()).toBe('#1e9bc9')
    expect(() => new Color(156, 245, 111, 20)).toThrow()
    expect(() => new Color('13123123')).toThrow()
    expect(() => new Color('#a12cb3', 90)).toThrow()
    // @ts-ignore Ignore bad constructor warning, we are testing to see if it throws
    expect(() => new Color(123, 123, 123, 123, 123, 123)).toThrow()
  })
})
