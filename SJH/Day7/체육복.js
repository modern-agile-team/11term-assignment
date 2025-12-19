function solution(n, lost, reserve) {
    lost.sort((a, b) => a - b);
    reserve.sort((a, b) => a - b);
    let participation = n - lost.length;
    const lostSet = new Set(lost);
    for (let i = 0; i < reserve.length; i++) {
        if (LostSet.has(reserve[i])) {
            participation++;
            LostSet.delete(reserve[i]);
            reserve[i] = -1;
        }
    }
    for (let i = 0; i < reserve.length; i++) {
        if (reserve[i] === -1) continue;
        if (LostSet.has(reserve[i] - 1)) {
            participation++;
            LostSet.delete(reserve[i] - 1);
        } else if (LostSet.has(reserve[i] + 1)) {
            participation++;
            LostSet.delete(reserve[i] + 1);
        }
    }
    return participation;
}
