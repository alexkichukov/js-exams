type ColorConstrValues =
  | []
  | [string]
  | [string, number]
  | [number, number, number]
  | [number, number, number, number]

type RGBColor = {
  r: number
  g: number
  b: number
  opacity: number
}

class Color {
  color: RGBColor = { r: 0, g: 0, b: 0, opacity: 1 }

  constructor(...values: ColorConstrValues) {
    // Different constructors
    const rgbConstructor = (r: number, g: number, b: number, opacity: number = 1) => {
      if (opacity < 0 || opacity > 1) throw new Error('Opacity must be in the range of 0..1')
      this.color = { r, g, b, opacity }
    }

    const hexConstructor = (hex: string, opacity: number = 1) => {
      if (opacity < 0 || opacity > 1) throw new Error('Opacity must be in the range of 0..1')
      if (!hex.startsWith('#') || (hex.length !== 4 && hex.length !== 7))
        throw new Error('Invalid hex code.')

      if (hex.length === 4) {
        this.color = {
          r: parseInt(hex[1].repeat(2), 16),
          g: parseInt(hex[2].repeat(2), 16),
          b: parseInt(hex[3].repeat(2), 16),
          opacity: 1
        }
      } else if (hex.length === 7) {
        this.color = {
          r: parseInt(hex.slice(1, 3), 16),
          g: parseInt(hex.slice(3, 5), 16),
          b: parseInt(hex.slice(5, 7), 16),
          opacity
        }
      }
    }

    // Type checkers
    const isNum = (a: any) => typeof a === 'number'
    const areNum = (a: any[]) => a.reduce((prev, curr) => (isNum(curr) ? prev : false), true)
    const isStr = (a: any) => typeof a === 'string'

    // Call appropriate constructor
    if (values.length === 0) rgbConstructor(0, 0, 0)
    else if (values.length === 1 && isStr(values[0])) hexConstructor(values[0])
    else if (values.length === 2 && isStr(values[0]) && isNum(values[1]))
      hexConstructor(values[0], values[1])
    else if (values.length === 3 && areNum(values))
      rgbConstructor(...(values as [number, number, number]))
    else if (values.length === 4 && areNum(values))
      rgbConstructor(...(values as [number, number, number, number]))
    else throw new Error('Color constructor was not provided with appropriate arguments.')
  }

  getColorRGB(): string {
    const { r, g, b, opacity } = this.color
    if (opacity === 1) return `rgb(${r}, ${g}, ${b})`
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  getColorLongHex(): string {
    const { r, g, b, opacity } = this.color
    if (opacity === 1) return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}${Math.round(
      opacity * 255
    ).toString(16)}`
  }

  getColorShortHex(): string {
    const { r, g, b } = this.color
    return `#${Math.round(r / 17).toString(16)}${Math.round(g / 17).toString(16)}${Math.round(
      b / 17
    ).toString(16)}`
  }
}

export default Color
