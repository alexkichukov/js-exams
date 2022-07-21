const randomizeAndFindLongestSequence = (arr: number[]) => {
  const copy = [...arr];
  const randomized: number[] = [];

  // Randomize
  for (let i = 0; i < arr.length; i++) {
    const randIndex = Math.floor(Math.random() * copy.length);
    randomized.push(copy.splice(randIndex, 1)[0]);
  }

  // Log randomized array if needed:
  console.log('Randomized array:', randomized.join(', '));

  // Store all sequences of ascending numbers
  const sequences: number[][] = [];

  // Store current sequence
  const temp: number[] = [];
  for (let i = 0; i < randomized.length; i++) {
    if (temp.length === 0 || randomized[i] >= temp[temp.length - 1]) temp.push(randomized[i]);
    else {
      sequences.push([...temp]);
      temp.length = 0;
      temp[0] = randomized[i];
    }

    if (i === randomized.length - 1) sequences.push([...temp]);
  }

  const longestSequence = sequences.reduce((prev, curr) =>
    curr.length > prev.length ? curr : prev
  );
  return longestSequence;
};

// Example usage:
// console.log(randomizeAndFindLongestSequence([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

export { randomizeAndFindLongestSequence };
