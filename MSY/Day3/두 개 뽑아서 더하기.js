function solution(numbers) {
    const result = [];

    for (let aIndex = 0; aIndex < numbers.length; aIndex++) {
        for (let bIndex = aIndex + 1; bIndex < numbers.length; bIndex++) {
            const sum = numbers[aIndex] + numbers[bIndex];

            if (!result.includes(sum)) { 
                result.push(sum);
            }
        }
    }
    return result.sort((a, b) => a - b);
}