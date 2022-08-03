// Part 1
const sumOfHigherThan = (arr: number[], higherThan: number) =>
  arr.reduce((prev, curr) => (curr > higherThan ? prev + curr : prev), 0)

// Part 2
const arrOfDivisibleBy = (arr: number[], divisbleBy: number) =>
  arr.filter(item => item % divisbleBy === 0)

export { sumOfHigherThan, arrOfDivisibleBy }
