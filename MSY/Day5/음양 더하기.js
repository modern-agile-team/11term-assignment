function solution(absolutes, signs) {
  let sum = 0;

  for (let i = 0; i < absolutes.length; i++) {
    if (signs[i] === true) {
      sum += absolutes[i];   
    } else {
      sum -= absolutes[i];     
    }
  }

  return sum;
  
/* reduce 사용한 소스
  return absolutes.reduce((sum, value, index) => {
    if (signs[index] === true) {
      return sum + value;
    } else {
      return sum - value;
    }
  }, 0);
*/
}