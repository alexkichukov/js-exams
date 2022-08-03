// Part 1
function appender_Part1(arr1: any[], arr2: any[]) {
  // Push truthy values only in the first array
  for (const item of arr2) {
    if (item) arr1.push(item)
  }
}

// Part 2
function appender_Part2(arr1: any[][], arr2: any[]) {
  // Array values from the second array
  const arrValues = arr2.filter(item => Array.isArray(item)).flat()
  // Object values from the second array
  const objValues = arr2.filter(
    item => typeof item === 'object' && item !== null && !Array.isArray(item)
  )

  // Push truthy values only in the first array
  for (let i = 0; i < arr1.length; i++) {
    if (i % 2 === 0) arr1[i].push(...arrValues)
    else arr1[i].push(...objValues)
  }
}

export { appender_Part1, appender_Part2 }
