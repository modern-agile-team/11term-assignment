function solution(answers) {
    let answer = [];
    const pattern1 = [1, 2, 3, 4, 5];
    const pattern2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === pattern1[i % pattern1.length]) {
            score1++;
        }
        if (answers[i] === pattern2[i % pattern2.length]) {
            score2++;
        }
        if (answers[i] === pattern3[i % pattern3.length]) {
            score3++;
        }
    }
    let maxScore = Math.max(score1, score2, score3);
    if (score1 === maxScore) {
        answer.push(1);
    }
    if (score2 === maxScore) {
        answer.push(2);
    }
    if (score3 === maxScore) {
        answer.push(3);
    }
    return answer;
}
