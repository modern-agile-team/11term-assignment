function solution(lottos, win_nums) {
  const winSet = new Set(win_nums);

  let zeros = 0;   
  let hit = 0;     

  for (const n of lottos) {
    if (n === 0) zeros++;
    else if (winSet.has(n)) hit++;
  }

  const bestMatch = hit + zeros;
  const worstMatch = hit;

  const rank = (match) => {
    return match >= 2 ? 7 - match : 6;
  };

  return [rank(bestMatch), rank(worstMatch)];
}