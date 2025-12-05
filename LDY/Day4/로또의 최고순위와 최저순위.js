function solution(lottos, win_nums) {
  const correctCounts = [0, 0];

  for (let i = 0; i < lottos.length; i++) {
    const currentLottoNum = lottos[i];
    if (win_nums.includes(currentLottoNum) || currentLottoNum === 0) {
      correctCounts[0] += 1;
    }
    if (win_nums.includes(currentLottoNum)) {
      correctCounts[1] += 1;
    }
  }

  return correctCounts.map((correctCount) => {
    switch (correctCount) {
      case 6:
        return 1;
      case 5:
        return 2;
      case 4:
        return 3;
      case 3:
        return 4;
      case 2:
        return 5;
      default:
        return 6;
    }
  });
}
