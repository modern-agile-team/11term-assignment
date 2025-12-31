function solution(s) {
    let result = "";
    let idx = 0; 

    for (let ch of s) {
        if (ch === " ") {
            result += " ";
            idx = 0;
        } else {
            result += idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase();
            idx++;
        }
    }

    return result;
}
