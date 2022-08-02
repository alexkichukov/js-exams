function bubbleSort(arr: number[]): number[] {
  const arrSorted = [...arr]
  for (let i = 0; i < arrSorted.length; i++) {
    for (let j = 0; j < arrSorted.length - i - 1; j++) {
      if (arrSorted[j] > arrSorted[j + 1]) {
        const temp = arrSorted[j]
        arrSorted[j] = arrSorted[j + 1]
        arrSorted[j + 1] = temp
      }
    }
  }
  return arrSorted
}

export { bubbleSort }
