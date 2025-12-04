function solution(numbers) {
  const numSet = new Set();

  numbers.forEach((value1, index1) => {
    numbers.forEach((value2, index2) => {
      if (index1 !== index2) {
        numSet.add(value1 + value2);
      }
    });
  });

  return Array.from(numSet).sort((a, b) => a - b);
}
