// 입력 필드에서 값을 가져오는 함수
function getInputValue() {
    const inputField = document.querySelector('input[type="text"]');
    return inputField.value.trim();
}

// 입력값이 exit 명령어인지 확인하는 함수
function isExitCommand(input) {
    return input.toLowerCase() === 'exit';
}

// exit 명령어 처리 함수
function handleExit() {
    alert('계산기를 종료합니다.');
    disableInput();
    displayResult('Calculator exited.');
}

// 입력 필드를 비활성화하는 함수
function disableInput() {
    const inputField = document.querySelector('input[type="text"]');
    inputField.disabled = true;
}

// 결과를 화면에 표시하는 함수
function displayResult(message) {
    const resultField = document.getElementById('result');
    resultField.textContent = message;
}

// 표현식에서 공백을 제거하는 함수
function removeSpaces(expression) {
    return expression.replace(/\s+/g, '');
}

// 사칙연산 표현식인지 검증하는 함수
function isValidExpression(expression) {
    const validPattern = /^[\d+\-*/().]+$/;
    return validPattern.test(expression);
}

// 계산을 수행하는 함수
function performCalculation(expression) {
    try {
        const result = eval(expression);
        return result;
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

// 결과를 소수점 둘째자리로 포맷팅하는 함수
function formatResult(result) {
    if (typeof result !== 'number' || isNaN(result)) {
        throw new Error('Invalid calculation result');
    }
    // 소수점 둘째자리까지 반올림 후 불필요한 0 제거
    return Math.round(result * 100) / 100;
}

// 계산 처리 메인 함수
function handleCalculation() {
    const input = getInputValue();

    if (isExitCommand(input)) {
        handleExit();
        return;
    }

    processCalculation(input);
}

// 계산 프로세스를 처리하는 함수
function processCalculation(input) {
    const expression = removeSpaces(input);

    if (!isValidExpression(expression)) {
        displayResult('Error: Invalid expression.');
        return;
    }

    executeCalculation(expression);
}

// 계산 실행 및 결과 표시 함수
function executeCalculation(expression) {
    try {
        const result = performCalculation(expression);
        const formattedResult = formatResult(result);
        displayResult(`${formattedResult}`);
    } catch (error) {
        displayResult('Error: Invalid expression.');
    }
}

// 버튼 클릭 이벤트 핸들러
function handleButtonClick() {
    handleCalculation();
}

// Enter 키 이벤트 핸들러
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleCalculation();
    }
}

// 이벤트 리스너를 등록하는 함수
function initializeEventListeners() {
    const button = document.querySelector('button');
    const inputField = document.querySelector('input[type="text"]');
    
    button.addEventListener('click', handleButtonClick);
    inputField.addEventListener('keypress', handleKeyPress);
}

// 계산기 초기화 함수
function initializeCalculator() {
    initializeEventListeners();
}

// DOM 로드 완료 후 계산기 초기화
document.addEventListener('DOMContentLoaded', initializeCalculator);