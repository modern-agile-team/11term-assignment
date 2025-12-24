function solution(n, arr1, arr2) {
    const secretMap = [];

    for (let i = 0; i < n; i++) {
        const firstBinRow = convertBinary(arr1, i, n);
        const secondBinRow = convertBinary(arr2, i, n);
        const parsedMapRow = parseMap(firstBinRow, secondBinRow, n);

        secretMap.push(parsedMapRow);
    }
    
    return secretMap;
}

function convertBinary(arr, i, n) {
    return arr[i].toString(2).padStart(n, "0");
}

function parseMap(arr1, arr2, n) {
    let result = "";
    
    for (let j = 0; j < n; j++) {
        result += (arr1[j] === "1" || arr2[j] === "1") ? "#" : " ";
    }
    
    return result;
}