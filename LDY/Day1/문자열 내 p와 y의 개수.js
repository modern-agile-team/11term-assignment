function solution(s) {
  let pCnt = 0,
    yCnt = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i].toUpperCase() === "P") {
      pCnt++;
    } else if (s[i].toUpperCase() === "Y") {
      yCnt++;
    }
  }

  return pCnt === yCnt;
}
