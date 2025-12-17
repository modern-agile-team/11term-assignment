function solution(n) {
    let sum = 0;
    const numArray = String(n).split("");

    for (let i = 0; i < numArray.length; i++) {
        sum += Number(numArray[i]);
    }

    return sum;
}