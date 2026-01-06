function buildFailRateList(N, stages) {
  const result = [];

  for (let i = 1; i <= N; i++) {
    let reached = 0;
    let notCleared = 0;

    for (const stage of stages) {
      if (stage >= i) reached++;
      if (stage === i) notCleared++;
    }

    const failRate = reached === 0 ? 0 : notCleared / reached;
    result.push({ stage: i, failRate });   
  }

  return result;
}

function solution(N, stages) {
  const list = buildFailRateList(N, stages);

  list.sort((a, b) => {
    if (b.failRate === a.failRate) return a.stage - b.stage;
    return b.failRate - a.failRate;
  });

  return list.map(v => v.stage);
}