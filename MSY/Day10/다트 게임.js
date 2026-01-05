function solution(dartResult) {
  const scores = [];
  let i = 0;

  while (i < dartResult.length) {
    let num = 0;

    if (dartResult[i] === '1' && dartResult[i + 1] === '0') {
      num = 10;
      i += 2;
    } else {
      num = Number(dartResult[i]);
      i += 1;
    }

    const bonus = dartResult[i];
    i += 1;

    if (bonus === 'S') num = num ** 1;
    else if (bonus === 'D') num = num ** 2;
    else if (bonus === 'T') num = num ** 3;

    if (dartResult[i] === '*' || dartResult[i] === '#') {
      const option = dartResult[i];
      i += 1;

      if (option === '*') {
        num *= 2;
        if (scores.length > 0) scores[scores.length - 1] *= 2;
      } else if (option === '#') {
        num *= -1;
      }
    }

    scores.push(num);
  }

  return scores.reduce((sum, v) => sum + v, 0);
}