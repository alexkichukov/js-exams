declare global {
  interface Array<T> {
    bubbleSort(compareFunction?: (a: T, b: T) => number): void
    minMaxSort(compareFunction?: (a: T, b: T) => number): void
  }
}

// Part 1: Sort in place using bubble sort algorithm
Array.prototype.bubbleSort = function (compareFunction) {
  if (!compareFunction) compareFunction = (a, b) => a.toString().localeCompare(b.toString())

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this.length - i - 1; j++) {
      if (compareFunction(this[j], this[j + 1]) > 0) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
    }
  }
}

// Part 2: Sort in place using min-max sort algorithm
Array.prototype.minMaxSort = function (compareFunction) {
  if (!compareFunction) compareFunction = (a, b) => a.toString().localeCompare(b.toString())

  const swap = (a: any, b: any) => {
    if (a === b) return

    const temp = this[a]
    this[a] = this[b]
    this[b] = temp
  }

  for (let i = 0; i < this.length / 2; i++) {
    let min = i
    let max = i

    for (let j = i; j < this.length - i; j++) {
      compareFunction(this[j], this[min]) < 0 && (min = j)
      compareFunction(this[j], this[max]) > 0 && (max = j)
    }

    swap(i, min)
    if (i === max) max = min
    swap(this.length - i - 1, max)
  }
}

// Example usage:
// const test = [2, 0, 8, 1, 5, 3, 9, 12, 5];
// const test2 = [2, 0, 8, 1, 5, 3, 9, 12, 5];
// const test3 = [2, 0, 8, 1, 5, 3, 9, 12, 5];

// const comparer: (a: any, b: any) => number = (a, b) => {
//   return a - b;
// }

// test.bubbleSort(comparer);
// test2.sort(comparer);
// test3.minMaxSort(comparer);

// console.log(test.join(', '));
// console.log(test2.join(', '));
// console.log(test3.join(', '));

export {}
