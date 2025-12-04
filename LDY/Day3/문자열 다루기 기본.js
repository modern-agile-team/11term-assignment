function solution(s) {
  const strLen = s.length;
  if (/^[0-9]+$/.test(s) && (strLen === 4 || strLen === 6)) {
    return true;
  } else {
    return false;
  }
}
