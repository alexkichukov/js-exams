import { getWeight_Part2 as getWeight } from '../Chapter_1/exam_1_5'

// Part 1
const findByWeight = (arr: any[], weight: number): boolean => {
  for (const item of arr) {
    if (weight === getWeight(item)) return true
  }
  return false
}

// Part 2
const allHigherThanWeight = (arr: any[], weight: number): boolean => {
  for (const item of arr) {
    if (getWeight(item) < weight) return false
  }
  return true
}

// Example usage:
// const arr = [6, 'Test', 'value', 1, undefined, null, { name: 'john.doe', role: 'admim' }];
// console.log(findByWeight(arr, 16));
// console.log(allHigherThanWeight(arr, 2));

export { findByWeight }
