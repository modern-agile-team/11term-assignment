function solution(participant, completion) {
  const result = {};

  mergeRunner(result, participant);
  mergeRunner(result, completion);

  for (const key in result) {
    if (result[key] % 2 !== 0) {
      return key;
    }
  }
}

function mergeRunner(result, runners) {
  for (const runner of runners) {
    if (result.hasOwnProperty(runner)) {
      result[runner] += 1;
    } else {
      result[runner] = 1;
    }
  }

  return result;
}
