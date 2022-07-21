declare global {
  interface Array<T> {
    countOdd: () => number;
    countTypes: () => {
      nullCount: number;
      objectsCount: number;
      stringsCount: number;
      numericsCount: number;
      arraysCount: number;
      undefinedCount: number;
      datesCount: number;
      booleansCount: number;
      functions: number;
    };
    bubbleSort(compareFunction?: (a: T, b: T) => number): void;
    findObj: (obj: Object) => boolean;
    appender_Part1: (arr: any[]) => void;
    appender_Part2: (arr: any[]) => void;
    removeInner: (percentage: number) => void;
  }
}

Array.prototype.countOdd = function () {
  let count = 0;
  for (const num of this) {
    if (num % 2 !== 0) count++;
  }
  return count;
};

Array.prototype.bubbleSort = function(compareFunction) {
  if (!compareFunction) compareFunction = (a, b) => a.toString().localeCompare(b.toString());

  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < this.length - i - 1; j++) {
      if (compareFunction(this[j], this[j + 1]) > 0) {
        const temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }

  return this;
}

Array.prototype.countTypes = function () {
  const count = {
    nullCount: 0, //
    objectsCount: 0,
    stringsCount: 0, //
    numericsCount: 0, //
    arraysCount: 0, //
    undefinedCount: 0, //
    datesCount: 0, //
    booleansCount: 0, //
    functions: 0
  };

  for (const item of this) {
    if (item === null) count.nullCount++;
    else if (item === undefined) count.undefinedCount++;
    else if (typeof item === 'string') count.stringsCount++;
    else if (typeof item === 'number' || typeof item === 'bigint') count.numericsCount++;
    else if (typeof item === 'boolean') count.booleansCount++;
    else if (typeof item === 'function') count.functions++;
    else if (Array.isArray(item)) count.arraysCount++;
    else if (item instanceof Date) count.datesCount++;

    // Separate object check (functions are considered objects too)
    if ((typeof item === 'object' || typeof item === 'function') && item !== null)
      count.objectsCount++;
  }

  return count;
};

Array.prototype.findObj = function (obj) {
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

  for (const item of Object.values(this)) {
    // Check both reference and values
    if (obj === item && objectEquals(obj, item)) return true;

    // Recursively search all objects (or arrays)
    if (typeof item === 'object' && item !== null) {
      if (this.findObj(item, obj)) return true;
    }
  }

  return false;
};

Array.prototype.appender_Part1 = function (arr) {
  // Push truthy values only in the first array
  for (const item of arr) {
    if (item) this.push(item);
  }
};

Array.prototype.appender_Part2 = function (arr) {
  // Array values from the provided array
  const arrValues = arr.filter(item => Array.isArray(item)).flat();
  // Object values from the provided array
  const objValues = arr.filter(item => typeof item === 'object' && item !== null && !Array.isArray(item))

  // Push truthy values only in the first array
  for (let i = 0; i < this.length; i++) {
    if (i % 2 === 0) this[i].push(...arrValues);
    else this[i].push(objValues);
  }
};

Array.prototype.removeInner = function (percentage) {
  // Determine how many elements to remove and at what index to start removing them
  let elementsToRemove = Math.ceil((percentage / 100) * this.length);
  if ((this.length - elementsToRemove) % 2 !== 0) elementsToRemove++;
  const startIndex = (this.length - elementsToRemove) / 2;

  this.splice(startIndex, elementsToRemove);
};

export {};
