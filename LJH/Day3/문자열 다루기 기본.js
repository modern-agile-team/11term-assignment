function solution(s) {
    if (s.length !== 4 && s.length !== 6) return false;
    
    return /^[0-9]+$/.test(s);
}
