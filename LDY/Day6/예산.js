function solution(d, budget) {
  const sortedPrice = [...d].sort((a, b) => a - b);
  let total = 0, deptCount = 0;

  for (const price of sortedPrice) {
    if (total + price > budget) {
      break;
    }
    total += price;
    deptCount++;
  }

  return deptCount;
}
