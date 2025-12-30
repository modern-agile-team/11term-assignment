function solution(board, moves) {
    moves = moves.map(mv => mv - 1);
    
    let stack = [];
    let cnt = 0;
    
    for (let i of moves) {
        for (let row of board) {
            if (row[i] != 0) {
                let doll = row[i];
                row[i] = 0;
                
                if (stack.length > 0 && stack[stack.length - 1] === doll) {
                    stack.pop();
                    cnt += 2;
                } else {
                    stack.push(doll);
                }
                
                break;
            }
        }
    }
    return cnt;
}