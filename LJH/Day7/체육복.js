function solution(n, lost, reserve) {
  lost.sort((a, b) => a - b);
  reserve.sort((a, b) => a - b);

  const lostSet = new Set(lost);
  const reserveSet = new Set(reserve);

  for (const r of reserve) {
    if (lostSet.has(r)) {
      lostSet.delete(r);
      reserveSet.delete(r);
    }
  }
    
  for (const r of Array.from(reserveSet).sort((a, b) => a - b)) {
    if (lostSet.has(r - 1)) {
      lostSet.delete(r - 1);
    } else if (lostSet.has(r + 1)) {
      lostSet.delete(r + 1);
    }
  }

  return n - lostSet.size;
}
