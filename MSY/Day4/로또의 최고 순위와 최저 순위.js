function solution(lottos, win_nums) {
  let unknown = 0;
  let match = 0;

  for (let i = 0; i < 6; i++) {
    if (lottos[i] === 0) {
      unknown++;
    } else if (win_nums.includes(lottos[i])) {
      match++;
    }
  }

  const rank = [6, 6, 5, 4, 3, 2, 1];

  return [rank[match + unknown], rank[match]];
}
