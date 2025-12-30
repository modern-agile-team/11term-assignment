function solution(answers) {
  const way1 = [1, 2, 3, 4, 5];
  const way2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const way3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  let score1 = 0, score2 = 0, score3 = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === way1[i % way1.length]) score1++;
    if (answers[i] === way2[i % way2.length]) score2++;
    if (answers[i] === way3[i % way3.length]) score3++;
  }

  const maxScore = Math.max(score1, score2, score3);
  const result = [];

  if (score1 === maxScore) result.push(1);
  if (score2 === maxScore) result.push(2);
  if (score3 === maxScore) result.push(3);

  return result;
}