function countTypes(arr: any[]) {
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
  }

  for (const item of arr) {
    if (item === null) count.nullCount++
    else if (item === undefined) count.undefinedCount++
    else if (typeof item === 'string') count.stringsCount++
    else if (typeof item === 'number' || typeof item === 'bigint') count.numericsCount++
    else if (typeof item === 'boolean') count.booleansCount++
    else if (typeof item === 'function') count.functions++
    else if (Array.isArray(item)) count.arraysCount++
    else if (item instanceof Date) count.datesCount++

    // Separate object check (functions are considered objects too)
    if ((typeof item === 'object' || typeof item === 'function') && item !== null)
      count.objectsCount++
  }

  return count
}

export { countTypes }
