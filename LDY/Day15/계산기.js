function main() {
  const calcInput = document.querySelector("#calculator-input");
  const strExpression = calcInput.value;

  // 계산식의 공백을 모두 제거
  const trimmedExpression = removeSpace(strExpression);

  // 입력받은 계산식 유효성 검사
  if(!isValidate(trimmedExpression)) {
    return;
  }

  const tokens = splitToTokens(trimmedExpression);
  const result = calculateTokens(tokens);

  renderResult(result);

  return;
}

// 입력받은 계산식 유효성 검사
function isValidate(input) {
  if (input === "exit") {
    showMessage("종료되었습니다.");
    return false;
  }

  // 계산식이 올바르지 못하면 경고창 출력 후 함수 종료
  // 첫문자와 끝문자가 숫자가 아닐때, 연산자가 두변 연속일때, 숫자와 +,-,*,/를 제외한 문자가 있을때
  const hasOtherChar = /[^\d+\-*/]/.test(input);
  const isConsecutiveOperator = /(\+|-|\/|\*){2,}/.test(input);

  if (
    (isNaN(input[0]) || isNaN(input[input.length - 1])) || 
    hasOtherChar || isConsecutiveOperator
  ) {
    showMessage("계산식이 올바르지 않습니다.");
    return false;
  }

  return true;
}

// 입력받은 수식을 토큰화하여 곱셈, 나눗셈 먼저 계산 후 덧셈, 뺄셈 연산 후 결과값 반환
function calculateTokens(tokens) {
  const afterMultiAndDivide = multiAndDivide(tokens);
  return plusAndMinus(afterMultiAndDivide);
}

// [숫자, 연산자, 숫자, 연산자, 숫자] 형식으로 나눠줌
function splitToTokens(expression) {
  return expression.match(/(\d+)|[+\-*/]/g);
}

// 공백 제거 함수
function removeSpace(expression) {
  return expression.replaceAll(" ", "");
}

// 곱셈, 나눗셈 계산 함수 
function multiAndDivide(tokens) {
  return calculating(tokens, ["*", "/"]);
}

// 덧셈, 뺄셈 계산 함수
function plusAndMinus(tokens) {
  return calculating(tokens, ["+", "-"]);
}

// 수식과 계산해야할 연산자를 받아 수식에 헤당 연산자가 있으면 계산 후 수식 변경
function calculating(tokens, operator) {
  for (let index = 0; index < tokens.length; index++) {
    const token = tokens[index];

    if (operator.includes(token)) {
      tokens = applyOperator(tokens, index, token)
      index -= 1;
    }
  } 

  return tokens;
}

// 연산 후 연산한 숫자와 연산자를 결과값으로 변경
function applyOperator(tokens, index, operator) {
  const result = computeOperation(operator, tokens[index-1], tokens[index+1]);

  if(!result) {
    showMessage("0으로 나눌 수 없습니다.");
    return;
  }

  tokens[index-1] = result;
  tokens.splice(index, 2);

  return tokens;
}

// 사칙연산 함수, 소수점은 2자리까지만 반환
function computeOperation(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      if (num2 === 0) return null;

      return Math.floor((num1 / num2) * 100) / 100;
  }
}

// 메시지를 받아 경고창을 출력
function showMessage(message) {
  alert(message);
  return;
}

// HTML에 연산 결과값을 출력할 요소에 결과값 삽입
function renderResult(result) {
  const resultDiv = document.querySelector("#result");
  resultDiv.innerText = result;
}