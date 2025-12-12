function solution(arr) {
    if (arr.length === 1) {
        return [-1];
    }
    const minValue = Math.min (...arr);
    const minValueDex = arr.indexOf (minValue);
    arr.splice (minValueDex, 1);
    return arr;
}
