function solution(s) {
    s = s.toLowerCase();

    const pCount = [...s].filter(ch => ch === 'p').length;
    const yCount = [...s].filter(ch => ch === 'y').length;
    
    return pCount === yCount;
}
