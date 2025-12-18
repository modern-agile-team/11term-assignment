function solution(N, stages) {
  const failRates = [];
  let remainingPeople = stages.length;
  
  for (let i = 0; i < N; i++) {
    const failer = filterFailer(stages, i);
    const rate = failer/remainingPeople;
    
    pushFailRate(failRates, i, rate);
    
    remainingPeople -= failer;
  }
    
  return getSortedStageIds(failRates).map(item => item.stage);
}

function pushFailRate(failRates, stage, rate) {
  failRates.push({stage: stage+1, rate});
}

function filterFailer(users, index) {
  return users.filter(user => user === index+1).length;
}

function getSortedStageIds(failRate) {
  return failRate.sort((a, b) => (b.rate - a.rate));
}