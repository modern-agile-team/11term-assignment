function solution(s) {
    const len = s.length;
    const mid = Math.floor(len / 2);

    if (len % 2 === 0) {
        return s[mid - 1] + s[mid];
    } else {
        return s[mid];
    }
}