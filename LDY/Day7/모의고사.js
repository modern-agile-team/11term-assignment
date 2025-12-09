function solution(answers) {
    const patterns = [
        [1,2,3,4,5],
        [2,1,2,3,2,4,2,5],
        [3,3,1,1,2,2,4,4,5,5]
    ];
    const correctCountArr = [0, 0, 0];
    
    for(const [patternIndex, pattern] of patterns.entries()) {
        for(const [answerIndex, answer] of answers.entries()) {          
            const qustionIndex = answerIndex % pattern.length;
            if(answer === pattern[qustionIndex]) {
                correctCountArr[patternIndex]++;
            }
        }
    }

    return correctCountArr
            .map((value, index) => (value === Math.max(...correctCountArr) ? index + 1 : null))
            .filter(value => value);
}