function solution(n, arr1, arr2) {
    var answer = [];
    for (let i = 0; i < n; i++) {
        // 1. i번째 숫자를 가져와서 비트 OR 연산ㄴ
        const combined = arr1[i] | arr2[i];
        // 2. toString 으로 2진수 변환 후 n자리만큼 앞을 padStart로 '0'으로 채움
        const binaryStr = combined.toString(2).padStart(n, "0");
        // 3. replaceAll 을 이용해서 문자열을 전체 치환
        const row = binaryStr.replaceAll("1", "#").replaceAll("0", " ");
        answer.push(row);
    }
    return answer;
}
