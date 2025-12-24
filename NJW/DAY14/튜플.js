function solution(s) {
    var answer = [];

    let parts = s.slice(2, -2).split("},{");

    parts.sort((a, b) => a - b);

    let sets = parts.map((str) => str.split(",").map(Number));

    for (let currentSet of sets) {
        for (let value of answer) {
            let index = currentSet.indexOf(value);
            if (index !== -1) {
                currentSet.splice(index, 1);
            }
        }
        answer.push(currentSet[0]);
    }

    return answer;
}
