function solution(record) {
    let answer = [];
    let user_db = {};

    for (const r of record) {
        const word = r.split(" ");
        const cmd = word[0];
        const uid = word[1];
        const nickname = word[2];
        if (cmd === "Enter" || cmd === "Change") {
            user_db[uid] = nickname;
        }
    }

    for (const r of record) {
        const word = r.split(" ");
        const cmd = word[0];
        const uid = word[1];

        const nickname = user_db[uid];

        if (cmd === "Enter") {
            answer.push(`${nickname}님이 들어왔습니다.`);
        } else if (cmd === "Leave") {
            answer.push(`${nickname}님이 나갔습니다.`);
        }
    }

    return answer;
}
