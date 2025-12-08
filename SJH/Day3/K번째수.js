function solution( array, commands ) {
    let answer = [];
    
    for ( let x = 0; x < commands.length; x++ ) {
        let i = commands[x][0];
        let j = commands[x][1];
        let k = commands[x][2];
         
        let cut = array.slice( i - 1, j);
         
        cut.sort (function(a, b){
            return a - b;
        });
        let result = cut[k - 1];
         
         answer.push(result);
    }
    return answer;
}