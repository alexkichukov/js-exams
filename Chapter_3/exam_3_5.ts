declare global {
  interface Object {
    deepCopy: <A, B>(obj: A, obj2?: B) => B & A
  }
}

Object.deepCopy = function <A, B>(obj: A, obj2?: B) {
  // Copies object/array to specified object/array
  const copyTo = (from: { [key: string]: any }, to: { [key: string]: any }) => {
    for (const [key, value] of Object.entries(from)) {
      // Value is an array
      if (Array.isArray(value)) {
        to[key] = []
        copyTo(value, to[key])
      }
      // Value is an object
      else if (typeof value === 'object' && value !== null) {
        to[key] = {}
        copyTo(value, to[key])
      }
      // Value is a function
      else if (typeof value === 'function') to[key] = value.bind(to)
      // Otherwise it is a primitive
      else to[key] = value
    }
  }

  const copy = {}

  if (obj2) copyTo(obj2, copy)
  copyTo(obj, copy)

  return copy as B & A
}

// Example usage:
// const original = {
//   hey: 'there',
//   num: 5092,
//   something: { test: true },
//   arr: [
//     {
//       a: 'a',
//       b: function () {
//         console.log(this.a);
//       }
//     }
//   ]
// };
// const copy: typeof original = Object.deepCopy(original);
// original.something.test = false;
// original.arr.push({ a: 'some other object', b: () => console.log('hello') });
// original.arr[0].a = 'CHANGED';
// original.arr[0].b();
// copy.arr[0].b();
// console.log(original);
// console.log(copy);

export {}
