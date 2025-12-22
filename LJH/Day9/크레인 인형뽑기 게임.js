function solution(board, moves) {
  const n = board.length;
  const basket = [];
  let removed = 0;

  for (const m of moves) {
    const col = m - 1; 

    for (let row = 0; row < n; row++) {
      const doll = board[row][col];
      if (doll !== 0) {
        board[row][col] = 0; 
        const top = basket[basket.length - 1];
        if (top === doll) {
          basket.pop();
          removed += 2;
        } else {
          basket.push(doll);
        }
        break; 
      }
    }
  }

  return removed;
}
