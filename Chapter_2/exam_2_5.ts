type FlattenedObject = {
  [key: string]: any
}

const flatten = (input: Object[]): FlattenedObject[] => {
  const result: FlattenedObject[] = [];

  // Flatten each object in input array
  for (const object of input) {
    const flattened: FlattenedObject = {};

    const f = (input: Object, output: FlattenedObject, prefix?: string) => {
      const entries = Object.entries(input);
      prefix = prefix ? `${prefix}_` : '';
      
      for (const [key, value] of entries) {
        if (typeof value === 'object' && value !== null){
          f(value, output, prefix + key);
          continue;
        }
        output[prefix + key] = value;
      }
    }
    f(object, flattened);

    result.push(flattened);
  }

  return result;
};

// Example usage:
// const people = [{ 
//   person: { 
//     firstName: {
//       name: [{ name: 1 }, "4"],
//     }, 
//     lastName: "Doe", 
//     role: "Admin" 
//   }, 
//   permissions: ["read", "write", "special"], 
//   age: 42, 
//   competencies: [{skill: "JavaScript", level: "junior"}, {skill: "css", level: "junior"}] 
// }]
// console.log(flatten(people));

export { flatten };
