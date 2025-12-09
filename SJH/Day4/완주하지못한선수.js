function solution(participant, completion) {
    let answer = {};
    for (let name of participant) {
        answer[name] = (answer[name] || 0) + 1; 
    }
    for (let name of completion) {
        answer [name] -= 1;
    }
    for (let name in answer) {
        if (answer[name] > 0)
            return name;
    }
}