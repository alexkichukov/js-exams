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

export { findByWeight, allHigherThanWeight }
