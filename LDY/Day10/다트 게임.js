function solution(dartResult) {
  const parsedScores = parseScore(dartResult);
  const calculatedScores = [];
  
  for (const baseScore of parsedScores) {
    const { score, option } = splitScore(baseScore);
    const calculatedScore = applyOption(option, score, calculatedScores);

    calculatedScores.push(calculatedScore);
  }
  
  return calculatedScores.reduce((sum, value) => (sum + value), 0);
}

// 입력받은 점수의 문자열을 "점수|보너스|옵션" 세트로 나누어 반환
function parseScore(base) {
    return base.match(/\d+[A-Z][*|#]?/g);
}

// 나눠진 세트의 점수를 보너스 별로 계산하고 옵션을 추출하여 반환
function splitScore(baseScore) {
  const option = baseScore[baseScore.length - 1];
  const bonus = baseScore.match(/[A-Z]/)[0];
  const score = calculateScore(parseInt(baseScore.match(/\d+/)), bonus);
  
  return { score, option };
}

// 각 보너스별로 점수에 제곱을 해주고 반환
function calculateScore(score, bonus) {
  const POW = { S: 1, D: 2, T: 3 };
  return score ** POW[bonus]; 
}

// *|#이 있으면 해당 옵션을 적용 후 반황
function applyOption(option, score, scoreArr) {
  if (option === "*") {
    if (scoreArr.length > 0) scoreArr[scoreArr.length - 1] *= 2;
    score *= 2;
  } else if(option === "#") {
    score *= -1;
  }
  
  return score;
}