// Part 1
function getWeight_Part1(obj: Object | any): number {
  // Searches first level properties only and returns their total weight
  function searchObject(obj: Object): number {
    let weight = 0;
  
    for (const prop in obj) {
      // Skip properties that might be from the prototype chain
      if (!obj.hasOwnProperty(prop)) continue;
  
      const item = obj[prop as keyof Object];
  
      if (item === null) weight += 2;
      else if (item === undefined) weight += 2;
      else if (item instanceof Date) weight += 5;
      else if (typeof item === 'boolean') weight += 4;
      else if (typeof item === 'number' || typeof item === 'bigint') weight += 4;
      else if (typeof item === 'string') weight += 8;
      else if (typeof item === 'function') weight += 10;
      else if (Array.isArray(item)) weight += 10;
      else if (typeof item === 'object') {
        weight += 10;
      }
    }
  
    return weight;
  }

  // If argument isn't an object, pass it as if it is an object
  if (typeof obj !== 'object' || obj === null) return searchObject({ obj });

  return searchObject(obj);
}

// Part 2
function getWeight_Part2(obj: Object | any): number {
  // Recursively searches all properties (deep search) and returns their total weight
  function searchObject(obj: Object): number {
    let weight = 0;
  
    for (const prop in obj) {
      // Skip properties that might be from the prototype chain
      if (!obj.hasOwnProperty(prop)) continue;
  
      const item = obj[prop as keyof Object];
  
      if (item === null) weight += 2;
      else if (item === undefined) weight += 2;
      else if (item instanceof Date) weight += 5;
      else if (typeof item === 'boolean') weight += 4;
      else if (typeof item === 'number' || typeof item === 'bigint') weight += 4;
      else if (typeof item === 'string') weight += 8;
      else if (typeof item === 'function') weight += 10;
      else if (Array.isArray(item)) weight += 10;
      else if (typeof item === 'object') {
        weight += 10;
        weight += searchObject(item);
      }
    }
  
    return weight;
  }

  // If argument isn't an object, pass it as if it is an object
  if (typeof obj !== 'object' || obj === null) return searchObject({ obj });

  return searchObject(obj);
}

// Example usage:
// const input = {
//   cards: 6,
//   label: 'Test',
//   description: 'value',
//   type: 1,
//   role: undefined,
//   person: { name: 'John Doe' },
//   skills: null,
//   report: () => {
//     console.log('Hello,  world!');
//   },
//   experience: { count: 5 }
// };
// console.log('Part 1:')
// console.log(getWeight_Part1(input));
// console.log('Part 2:')
// console.log(getWeight_Part2(input));

export { getWeight_Part1, getWeight_Part2 };
