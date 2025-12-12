function solution(n) {
  return n
    .toString()
    .split("")
    .reduce((a, c) => a + Number(c), 0);
}
