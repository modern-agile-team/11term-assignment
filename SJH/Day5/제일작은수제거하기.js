function solution(arr) {
    if (arr.length === 1) {
        return [-1];
    }
    const small = Math.min (...arr);
    const smalldex = arr.indexOf (small);
    arr.splice (smalldex, 1);
    if (arr.length === 0) {
        return [-1];
    } else {
        return arr;
    }
}
