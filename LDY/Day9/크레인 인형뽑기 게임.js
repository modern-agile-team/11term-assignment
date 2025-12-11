function solution(board, moves) {
  const bucket = [];
  let result = 0;
  
  for (const move of moves) {
    for (const [rowIndex, row] of board.entries()) {
      const columnIndex = move - 1;
      const currentDoll = row[columnIndex];
      if (currentDoll !== 0) {
        if (bucket[bucket.length - 1] === currentDoll) {
          result += 2;
          bucket.pop();
        } else {
          bucket.push(currentDoll);
        }
        
        board[rowIndex][columnIndex] = 0;
        break;
      }
    }
  };
  
  return result;
}