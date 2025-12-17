function solution(array, commands) {
    const answer = [];

    for (let index = 0; index < commands.length; index++) {
        const i = commands[index][0];
        const j = commands[index][1];
        const k = commands[index][2];

        const sliced = array.slice(i - 1, j);
        sliced.sort((a, b) => a - b);

        answer.push(sliced[k - 1]);
    }

    return answer;
}
