function solution(d, budget) {
  const sortedReqPrice = [...d].sort((a, b) => a - b);
  const depts = [];
  let total = 0;

  for (const price of sortedReqPrice) {
    if (total + price <= budget) {
      total += price;
      depts.push(price);
    } else {
      break;
    }
  }

  return depts.length;
}
