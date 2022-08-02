// Part 1
const sumOfHigherThan = (arr: number[], higherThan: number) =>
  arr.reduce((prev, curr) => (curr > higherThan ? prev + curr : prev), 0)

// Part 2
const arrOfDivisibleBy = (arr: number[], divisbleBy: number) =>
  arr.filter(item => item % divisbleBy === 0)

// Example usage:
// const arr1 = [1, 2, 3, 4, 5, 6, 7];
// console.log(sumOfHigherThan(arr1, 4));
// console.log(arrOfDivisibleBy(arr1, 2));

export { sumOfHigherThan, arrOfDivisibleBy }
