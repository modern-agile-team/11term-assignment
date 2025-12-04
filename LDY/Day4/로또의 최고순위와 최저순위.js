function solution(lottos, win_nums) {
  let correctCounts = [0, 0];

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
        break;
      case 5:
        return 2;
        break;
      case 4:
        return 3;
        break;
      case 3:
        return 4;
        break;
      case 2:
        return 5;
        break;
      default:
        return 6;
        break;
    }
  });
}
