function solution(N, stages) {
    let answer = [];

    stages.sort((a, b) => a - b);
    let total_players = stages.length;
    let idx = 0;

    for (let stage = 1; stage <= N; stage++) {
        let count = 0;

        while (idx < stages.length && stages[idx] === stage) {
            count += 1;
            idx += 1;
        }

        let fail_rate = 0;
        if (total_players === 0) {
            fail_rate = 0;
        } else {
            fail_rate = count / total_players;
        }

        answer.push([stage, fail_rate]);

        total_players -= count;
    }

    answer.sort((a, b) => {
        if (b[1] !== a[1]) {
            return b[1] - a[1];
        }
        return a[0] - b[0];
    });

    return answer.map((item) => item[0]);
}
