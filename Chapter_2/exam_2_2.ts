// Part 1
function findObj_Part1(input: any[], obj: Object) {
  for (const item of Object.values(input)) {
    if (obj === item) return true
  }

  return false
}

// Part 2
function findObj_Part2(input: any[] | Object, obj: Object) {
  for (const item of Object.values(input)) {
    if (obj === item) return true

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (findObj_Part2(item, obj)) return true
    }
  }

  return false
}

// Part 3
function findObj_Part3(input: any[] | Object, obj: Object) {
  // Returns true if the two objects have the same values regardless of keys (deep)
  const objectsHaveSameValues = (obj1: Object, obj2: Object) => {
    // Helper type checker
    const isObj = (a: any): boolean => typeof a === 'object' && a !== null

    // If one of these are not objects then they can't be equal
    if (!isObj(obj1) || !isObj(obj2)) return false

    // Get an array of all object values (deep)
    const getValues = (obj: Object): unknown[] => {
      const values = Object.values(obj)

      // Check all values for any objects, if there are any then remove them from
      // the array and add their values in place instead
      for (let i = 0; i < values.length; i++) {
        if (isObj(values[i])) {
          values.splice(i, 1, ...getValues(values[i]))
        }
      }

      return values
    }

    const values1 = getValues(obj1)
    const values2 = getValues(obj2)

    // Not the same amount of values means they arent equal
    if (values1.length !== values2.length) return false

    // If the two arrays dont have the same
    for (let i = 0; i < values1.length; i++) {
      if (values2.includes(values1[i])) values2.splice(i, 1)
      else return false
    }

    return true
  }

  for (const item of Object.values(input)) {
    if (objectsHaveSameValues(obj, item)) return true

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (findObj_Part3(item, obj)) return true
    }
  }

  return false
}

// Part 4
function findObj_Part4(input: any[] | Object, obj: Object) {
  // Returns true if the two objects have the same values regardless of keys (deep)
  const objectsHaveSameValues = (obj1: Object, obj2: Object) => {
    // Helper type checker
    const isObj = (a: any): boolean => typeof a === 'object' && a !== null

    // If one of these are not objects then they can't be equal
    if (!isObj(obj1) || !isObj(obj2)) return false

    // Get an array of all object values (deep)
    const getValues = (obj: Object): unknown[] => {
      const values = Object.values(obj)

      // Check all values for any objects, if there are any then remove them from
      // the array and add their values in place instead
      for (let i = 0; i < values.length; i++) {
        if (isObj(values[i])) {
          values.splice(i, 1, ...getValues(values[i]))
        }
      }

      return values
    }

    const values1 = getValues(obj1)
    const values2 = getValues(obj2)

    // Not the same amount of values means they arent equal
    if (values1.length !== values2.length) return false

    // If the two arrays dont have the same
    for (let i = 0; i < values1.length; i++) {
      if (values2.includes(values1[i])) values2.splice(i, 1)
      else return false
    }

    return true
  }

  for (const item of Object.values(input)) {
    // Check for either reference and values
    if (obj === item || objectsHaveSameValues(obj, item)) return true

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (findObj_Part4(item, obj)) return true
    }
  }

  return false
}

export { findObj_Part1, findObj_Part2, findObj_Part3, findObj_Part4 }
