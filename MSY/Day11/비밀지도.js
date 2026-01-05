function solution(n, arr1, arr2) {
    let result = [];
    let arr = arr1.map((a, i) => a | arr2[i]);

    arr = arr.map(a => {
        const binary = a.toString(2);
        return '0'.repeat(n - binary.length) + binary;
    });
    
    for (let a of arr) {
        a = a.replace(/1/g, '#');
        a = a.replace(/0/g, ' ');
        result.push(a);
    }
     
    return result;
}