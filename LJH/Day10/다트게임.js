function solution(dartResult) {
  const scores = [];
  const n = dartResult.length;

  for (let i = 0; i < n; i++) {
    let num = 0;
    if (dartResult[i] === '1' && dartResult[i + 1] === '0') {
      num = 10;
      i++;
    } else {
      num = dartResult.charCodeAt(i) - '0'.charCodeAt(0);
    }

    i++;
    const bonus = dartResult[i];
    if (bonus === 'S') num = Math.pow(num, 1);
    else if (bonus === 'D') num = Math.pow(num, 2);
    else if (bonus === 'T') num = Math.pow(num, 3);

    scores.push(num);

    if (i + 1 < n) {
      const opt = dartResult[i + 1];
      if (opt === '*' || opt === '#') {
        if (opt === '*') {
          scores[scores.length - 1] *= 2;
          if (scores.length >= 2) scores[scores.length - 2] *= 2;
        } else {
          scores[scores.length - 1] *= -1;
        }
        i++; 
      }
    }
  }

  return scores[0] + scores[1] + scores[2];
}
