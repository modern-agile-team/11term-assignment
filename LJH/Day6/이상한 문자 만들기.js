function solution(s) {
    let result = "";
    let idx = 0; 

    for (let ch of s) {
        if (ch === " ") {
            result += " ";
            idx = 0;
        } else {
            if (idx % 2 === 0) {
                result += ch.toUpperCase();
            } else {
                result += ch.toLowerCase();
            }
            idx++;
        }
    }

    return result;
}
