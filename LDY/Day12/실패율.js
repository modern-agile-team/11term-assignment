function solution(N, stages) {
  const failRates = [];
  let remainingUsers = stages.length;
  
  for (let i = 0; i < N; i++) {
    const failedUsersCount = getFailedUserCount(stages, i);
    const rate = failedUsersCount/remainingUsers;
    
    pushFailRate(failRates, i, rate);
    
    remainingUsers -= failedUsersCount;
  }
    
  return getSortedStageIds(failRates).map(item => item.stage);
}

function pushFailRate(failRates, stage, rate) {
  failRates.push({stage: stage+1, rate});
}

function getFailedUserCount(users, index) {
  return users.filter(user => user === index+1).length;
}

function getSortedStageIds(failRate) {
  return failRate.sort((a, b) => (b.rate - a.rate));
}