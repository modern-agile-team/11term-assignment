function solution(participant, completion) {
  const runnerCount = {}; 

  for (const runner of participant) {
    runnerCount[runner] = (runnerCount[runner] || 0) + 1;
  }

  for (const finisher of completion) {
    runnerCount[finisher] -= 1;
  }

  for (const runner in runnerCount) {
    if (runnerCount[runner] > 0) return runner;
  }
}