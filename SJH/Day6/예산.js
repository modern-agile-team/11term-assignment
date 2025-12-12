function solution(d, budget) {
    let count = 0;
    let remain = budget;
    d.sort(function(a, b) {
        return a - b;
    });
    for (let i = 0; i < d.length; i++) {
        if (remain >= d[i]) {
            remain = remain - d[i];
            count = count + 1;
        } else {
            break;
        }
    }
    return count;
}
