function solution(N, stages) {
  let dic = {};
  let allPlayer = stages.length;

  let stageCount = Array(N + 2).fill(0);
  for (let s of stages) {
    stageCount[s]++;
  }

  for (let i = 1; i <= N; i++) {
    let notClearPlayer = stageCount[i];
    let failRate = allPlayer === 0 ? 0 : notClearPlayer / allPlayer;

    dic[i] = failRate;
    allPlayer -= notClearPlayer;
  }

  let dicSort = Object.entries(dic).sort((a, b) => b[1] - a[1]);
  
  let result = dicSort.map(([stage]) => Number(stage));

  return result;
}