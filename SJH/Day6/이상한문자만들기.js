function solution(s) {
    let result = "";
    let index = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") {
            result = result + " ";
            index = 0;
        } else {
            if (index % 2 === 0) {
                result = result + s[i].toUpperCase();
            } else {
                result = result + s[i].toLowerCase();
            }
            index = index + 1;
        }
    }
    return result;
}
