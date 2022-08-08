// Part 1
function getWeight_Part1(obj: Object | any): number {
  // Searches first level properties only and returns their total weight
  function searchObject(obj: Object): number {
    let weight = 0
    const values = Object.values(obj)

    for (const item of values) {
      if (item === null) weight += 2
      else if (item === undefined) weight += 2
      else if (item instanceof Date) weight += 5
      else if (typeof item === 'boolean') weight += 4
      else if (typeof item === 'number' || typeof item === 'bigint') weight += 4
      else if (typeof item === 'string') weight += 8
      else if (typeof item === 'function') weight += 10
      // Objects and arrays left here only
      else if (typeof item === 'object') {
        weight += 10
      }
    }

    return weight
  }

  // If argument isn't an object, pass it as if it is an object
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return searchObject({ obj })

  return searchObject(obj)
}

// Part 2
function getWeight_Part2(obj: Object | any): number {
  // Recursively searches all properties (deep search) and returns their total weight
  function searchObject(obj: Object): number {
    let weight = 0
    const values = Object.values(obj)

    for (const item of values) {
      if (item === null) weight += 2
      else if (item === undefined) weight += 2
      else if (item instanceof Date) weight += 5
      else if (typeof item === 'boolean') weight += 4
      else if (typeof item === 'number' || typeof item === 'bigint') weight += 4
      else if (typeof item === 'string') weight += 8
      else if (typeof item === 'function') weight += 10
      // Object and arrays left here only
      else if (typeof item === 'object') {
        weight += 10
        weight += searchObject(item)
      }
    }

    return weight
  }

  // If argument isn't an object, pass it as if it is an object
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return searchObject({ obj })

  return searchObject(obj)
}

export { getWeight_Part1, getWeight_Part2 }
