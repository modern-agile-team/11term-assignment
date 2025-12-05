function solution(absolutes, signs) {
  // for문 응용
  let result = 0;

  for (let i = 0; i < absolutes.length; i++) {
    result += signs[i] ? absolutes[i] : -absolutes[i];
  }

  return result;

  // reduce 응용
  return absolutes.reduce((a, c, i) => a + (signs[i] ? absolutes[i] : -absolutes[i]), 0);
}
