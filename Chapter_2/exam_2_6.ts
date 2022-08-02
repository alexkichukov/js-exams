const removeInner = (arr: any[], percentage: number) => {
  // Determine how many elements to remove and at what index to start removing them
  let elementsToRemove: number = Math.ceil((percentage / 100) * arr.length)
  if ((arr.length - elementsToRemove) % 2 !== 0) elementsToRemove++

  const startIndex = (arr.length - elementsToRemove) / 2
  arr.splice(startIndex, elementsToRemove)
}

// Example usage:
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const percentage = 50;
// removeInner(arr, percentage);
// console.log(arr);

export { removeInner }
