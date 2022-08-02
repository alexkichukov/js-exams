// Extra: cool one liners
const patternOne_oneliner = (length: number) =>
  console.log(
    Array(length)
      .fill(1)
      .map((_, index) =>
        Array(index + 1)
          .fill(1)
          .map((_, index) => index + 1)
          .join(' ')
      )
      .join('\n')
  )
const patternTwo_oneliner = (length: number) =>
  console.log(
    Array(length * 2 - 1)
      .fill(1)
      .map((_, index) =>
        Array(index >= length ? length * 2 - 1 - index : index + 1)
          .fill(1)
          .map((_, index) => index + 1)
          .join(' ')
      )
      .join('\n')
  )

// 1st Pattern
function patternOne(length: number) {
  for (let i = 1; i <= length; i++) {
    let line = ''
    for (let j = 1; j <= i; j++) line = line + j + ' '
    console.log(line)
  }
}

// 2nd Pattern
function patternTwo(length: number) {
  for (let i = 1; i <= length * 2 - 1; i++) {
    let line = ''
    for (let j = 1; j <= (i > length ? length * 2 - i : i); j++) line = line + j + ' '
    console.log(line)
  }
}

// 3rd Pattern
function patternThree(length: number) {
  for (let i = 1; i <= length; i++) {
    let line = ''
    for (let j = 1; j <= i * 2 - 1; j++) line = j > i ? line + (i * 2 - j) + ' ' : line + j + ' '
    console.log(line)
  }
}

// 4th Pattern
function patternFour(length: number) {
  const lines: string[] = [
    Array(length)
      .fill(1)
      .map((_, i) => i + 1)
      .join(' ')
  ]
  for (let i = 1; i < length; i++) {
    const line =
      ' '.repeat(i) +
      Array(length - i)
        .fill(1)
        .map((_, i) => i + 1)
        .join(' ') +
      ' '.repeat(i)
    lines.unshift(line)
    lines.push(line)
  }
  console.log(lines.join('\n'))
}

// 5th Pattern
function patternFive(length: number) {
  for (let i = 0; i < length; i++) {
    let line = ''
    let number = i + 1
    for (let j = 0; j <= i; j++) {
      line = line + number + ' '
      number += length - j - 1
    }
    console.log(line)
  }
}

// 6th pattern
function patternSix(length: number) {
  // Caculate the width of the string of the largest number
  let maxWidth = 1
  for (let max = length * 4 - 4; max % 10 !== max; max /= 10) maxWidth++

  // Pad a string to be of the same width as the largest number (if needed)
  const pad = (s: string) => (s = s.padStart(maxWidth, ' '))

  // Print first line
  console.log(
    Array(length)
      .fill(1)
      .map((_, i) => pad(`${i + 1}`))
      .join(' ')
  )

  // Print the lines between the first and last
  let left = length * 4 - 4
  let right = length + 1
  for (let i = 0; i < length - 2; i++) {
    console.log(
      pad(`${left--}`) + ' '.repeat(maxWidth * (length - 2) + length - 1) + pad(`${right++}`)
    )
  }

  // Print the last line
  console.log(
    Array(length)
      .fill(left)
      .map((n, i) => pad(`${n - i}`))
      .join(' ')
  )
}

// 7th Pattern
function patternSeven(length: number) {
  // Caculate the width of the string of the largest number
  let maxWidth = 1
  for (let max = length * length; max % 10 !== max; max /= 10) maxWidth++

  // Pad a string to be of the same width as the largest number (if needed)
  const pad = (s: string) => (s = s.padStart(maxWidth, ' '))

  const pattern: number[][] = []
  for (let i = 0; i < length; i++) pattern.push(Array(length))

  let x = 0
  let y = 0
  let direction = 0 // 0 = right, 1 = bottom, 2 = left, 3 = up

  // Shifts direction to the next one (if its 'up' then it goes back to 'right')
  const shiftDirection = () => (direction = direction === 3 ? 0 : direction + 1)

  for (let i = 1; i <= length * length; i++) {
    pattern[y][x] = i

    if (direction === 0) {
      x++
      if (x === length - 1 || pattern[y][x + 1]) shiftDirection()
    } else if (direction === 1) {
      y++
      if (y === length - 1 || pattern[y + 1][x]) shiftDirection()
    } else if (direction === 2) {
      x--
      if (x === 0 || pattern[y][x - 1]) shiftDirection()
    } else if (direction === 3) {
      y--
      if (y === 0 || pattern[y - 1][x]) shiftDirection()
    }
  }

  console.log(pattern.map(line => line.map(num => pad(num.toString())).join(' ')).join('\n'))
}

export { patternOne, patternTwo, patternThree, patternFour, patternFive, patternSix, patternSeven }
