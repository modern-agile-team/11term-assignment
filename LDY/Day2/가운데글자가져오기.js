function solution(s) {
  const midIndex = Math.floor(s.length / 2);

  if (s.length % 2 === 0) {
    return s.substr(midIndex - 1, 2);
  } else {
    return s[midIndex];
  }
}
