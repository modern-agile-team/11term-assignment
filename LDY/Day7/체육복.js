function solution(n, lost, reserve) {
    const lostSet = new Set([...lost].sort((a, b) => a - b))
    const reserveSet = new Set([...reserve].sort((a, b) => a - b));
    
    for (const student of lost) {
        if (reserveSet.has(student)) {
            lostSet.delete(student);
            reserveSet.delete(student);
        }
    }
    
    let result = n - lostSet.size;
    
    for (const student of Array.from(lostSet)) {
        if (reserveSet.has(student - 1)) {
            reserveSet.delete(student - 1);
            result += 1;
        } else if (reserveSet.has(student + 1)) {
            reserveSet.delete(student + 1);
            result += 1;
        }
    }
    
    return result;
}
