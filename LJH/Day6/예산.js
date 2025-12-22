function solution(d, budget) {
  d.sort((a, b) => a - b);

  let count = 0;
  let sum = 0;

  for (const cost of d) {
    if (sum + cost > budget) break;
    sum += cost;
    count++;
  }

  return count;
}
