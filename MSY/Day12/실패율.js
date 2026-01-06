function solution(N, stages) {
  const dic = {};
  let allPlayer = stages.length;

  const stageCount = Array(N + 2).fill(0);
  for (const s of stages) {
    stageCount[s]++;
  }

  for (let i = 1; i <= N; i++) {
    const notClearPlayer = stageCount[i];
    const failRate = allPlayer === 0 ? 0 : notClearPlayer / allPlayer;

    dic[i] = failRate;
    allPlayer -= notClearPlayer;
  }

  const dicSort = Object.entries(dic).sort((a, b) => b[1] - a[1]);
  const result = dicSort.map(([stage]) => Number(stage));

  return result;
}