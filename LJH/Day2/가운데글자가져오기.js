function solution(s) {
    const n = s.length;
    const mid = Math.floor(n / 2);

    return (n % 2 === 1) 
        ? s[mid]
        : s.substring(mid - 1, mid + 1);
}