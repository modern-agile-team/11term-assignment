function solution( array, commands ) {
    let answer = [];

    for ( let x = 0; x < commands.length; x++ ) { 
        let [i, j, k] = commands[x];

        let cut = array.slice( i - 1, j);
         
        cut.sort((a, b) => a - b);

        let result = cut[k - 1];
         
        answer.push(result);
    }
    return answer;
}