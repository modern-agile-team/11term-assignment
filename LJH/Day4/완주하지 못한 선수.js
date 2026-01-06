function solution(participant, completion) {
  const count = new Map();

  for (const name of participant) {
    count.set(name, (count.get(name) || 0) + 1);
  }

  for (const name of completion) {
    count.set(name, count.get(name) - 1);
  }

  for (const [name, c] of count) {
    if (c !== 0) return name;
  }
}