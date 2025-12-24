function solution(dartResult) {
    const result = [];
    let temp_num = 0;

    for (let i = 0; i < dartResult.length; i++) {
        const char = dartResult[i];

        // 1. 숫자 처리
        if (char >= "0" && char <= "9") {
            // 만약 숫자가 두자리인경우
            if (char === "0" && i > 0 && dartResult[i - 1] === "1") {
                temp_num = 10;
            } else {
                temp_num = parseInt(char);
            }

            // 2. 보너스 처리
        } else if (char === "S") {
            result.push(temp_num ** 1);
        } else if (char === "D") {
            result.push(temp_num ** 2);
        } else if (char === "T") {
            result.push(temp_num ** 3);
        }

        // 3. 옵션 처리
        else if (char === "*") {
            // 스타상: 현재 점수 2배
            result[result.length - 1] *= 2;
            if (result.length >= 2) {
                result[result.length - 2] *= 2;
            }
        } else if (char === "#") {
            // 아차상: 현재 점수 마이너스
            result[result.length - 1] *= -1;
        }
    }
    return result.reduce((acc, cur) => acc + cur, 0);
}

console.log(solution("1S2D*3T"));
