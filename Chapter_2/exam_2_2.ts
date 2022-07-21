// Part 1
function findObj_Part1(input: any[], obj: Object) {
  for (const item of Object.values(input)) {
    if (obj === item) return true;
  }

  return false;
}

// Part 2
function findObj_Part2(input: any[] | Object, obj: Object) {
  for (const item of Object.values(input)) {
    if (obj === item) return true;

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (findObj_Part2(item, obj)) return true;
    }
  }

  return false;
}

// Part 3
function findObj_Part3(input: any[] | Object, obj: Object) {
  // Compare two object for non referential equality (deep)
  const objectEquals = (obj1: Object, obj2: Object) => {
    // Helper type checker
    const isObj = (a: any): boolean => typeof a === 'object' && a !== null;

    // If one of these are not objects then they can't be equal
    if (!isObj(obj1) || !isObj(obj2)) return false;

    // If they dont have the same amount of keys they are already not equal
    const keys = Object.keys(obj1);
    if (keys.length !== Object.keys(obj2).length) return false;

    for (let i = 0; i < keys.length; i++) {
      const value1 = obj1[keys[i] as keyof typeof obj1];
      const value2 = obj2[keys[i] as keyof typeof obj2];

      // If values not of the same type they are not equal
      if (typeof value1 !== typeof value2) return false;
      
      // Recursively check any values that are objects
      if (isObj(value1) && isObj(value2)) {
        if (!objectEquals(value1, value2)) return false;
      } 
      // And compare other values directly
      else if (value1 !== value2) {
        return false;
      }
    }

    return true;
  }

  for (const item of Object.values(input)) {
    if (objectEquals(obj, item)) return true;

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (findObj_Part3(item, obj)) return true;
    }
  }

  return false;
}

// Part 3
function findObj_Part4(input: any[] | Object, obj: Object) {
  // Compare two object for non referential equality (deep)
  const objectEquals = (obj1: Object, obj2: Object) => {
    // Helper type checker
    const isObj = (a: any): boolean => typeof a === 'object' && a !== null;

    // If one of these are not objects then they can't be equal
    if (!isObj(obj1) || !isObj(obj2)) return false;

    // If they dont have the same amount of keys they are already not equal
    const keys = Object.keys(obj1);
    if (keys.length !== Object.keys(obj2).length) return false;

    for (let i = 0; i < keys.length; i++) {
      const value1 = obj1[keys[i] as keyof typeof obj1];
      const value2 = obj2[keys[i] as keyof typeof obj2];

      // If values not of the same type they are not equal
      if (typeof value1 !== typeof value2) return false;
      
      // Recursively check any values that are objects
      if (isObj(value1) && isObj(value2)) {
        if (!objectEquals(value1, value2)) return false;
      } 
      // And compare other values directly
      else if (value1 !== value2) {
        return false;
      }
    }

    return true;
  }

  for (const item of Object.values(input)) {
    // Check both reference and values
    if (obj === item && objectEquals(obj, item)) return true;

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (findObj_Part3(item, obj)) return true;
    }
  }

  return false;
}

// Example usage
// const person = { name: 'John Doe' };
// const input1 = [6, "Test", "value", person, 1, undefined, null,  () => { console.log("Hello,  world!") }, { count: 5 }, { name: "John Doe" }];
// const input2 = [6, "Test", "value", 1, undefined, null,  () => { console.log("Hello,  world!") }, { count: 5 }, { name: "John Doe", person }];
// const input3 = [6, "Test", "value", 1, undefined, null,  () => { console.log("Hello,  world!") }, { count: 5 }, { name: "John Doe" }];
// const input4 = [6, "Test", "value", 1, undefined, null,  () => { console.log("Hello,  world!") }, { count: 5 }, { name: "John Doe", person }];
// console.log(findObj_Part1(input1, person));
// console.log(findObj_Part2(input2, person));
// console.log(findObj_Part3(input3, person));
// console.log(findObj_Part4(input4, person));

export { findObj_Part1, findObj_Part2, findObj_Part3, findObj_Part4 };
