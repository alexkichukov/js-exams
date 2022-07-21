// Returns the count of odd numbers in an array
function countOdd(arr: number[]): number {
  let count = 0;
  for (const num of arr) {
    if (num % 2 !== 0) count++;
  }
  return count;
}

// Example usage:
// const input = [6, 4, 3, 1, 9, 44, 33, 2];
// console.log(countOdd(input));

export { countOdd };
