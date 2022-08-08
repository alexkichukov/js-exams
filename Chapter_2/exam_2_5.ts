type FlattenedObject = {
  [key: string]: any
}

const flatten = (input: Object[]): FlattenedObject[] => {
  const result: FlattenedObject[] = []

  // Flatten each object in input array
  for (const object of input) {
    const flattened: FlattenedObject = {}

    const f = (input: Object, output: FlattenedObject, prefix?: string) => {
      const entries = Object.entries(input)
      prefix = prefix ? `${prefix}_` : ''

      for (const [key, value] of entries) {
        if (typeof value === 'object' && value !== null) {
          f(value, output, prefix + key)
          continue
        }
        output[prefix + key] = value
      }
    }
    f(object, flattened)

    result.push(flattened)
  }

  return result
}

export { flatten }
