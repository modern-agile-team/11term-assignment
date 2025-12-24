function solution(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);

  const realLost = lost.filter(x => !reserve.includes(x));
  const realReserve = reserve.filter(x => !lost.includes(x));

  let gymCount = n - realLost.length;

  for (let i = 0; i < realLost.length; i++) {
    const student = realLost[i];

    const frontIndex = realReserve.indexOf(student - 1);
    if (frontIndex !== -1) {
      realReserve.splice(frontIndex, 1);
      gymCount++;
      continue;
    }

    const backIndex = realReserve.indexOf(student + 1);
    if (backIndex !== -1) {
      realReserve.splice(backIndex, 1);
      gymCount++;
    }
  }

  return gymCount;
}