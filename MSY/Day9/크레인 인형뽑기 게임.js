function pickUpDoll(board, column) {
    for (let row = 0; row < board.length; row++) {
        if (board[row][column] !== 0) {
            const doll = board[row][column];
            board[row][column] = 0;
            return doll;
        }
    }
    return null;
}
function handleBasket(basket, doll) {
    if (!doll) return 0;
    const last = basket[basket.length - 1];
    if (last === doll) {
        basket.pop();
        return 2;
    }
    basket.push(doll);
    return 0;
}
function solution(board, moves) {
    moves = moves.map(mv => mv - 1);
    const basket = [];
    let score = 0;
    for (const column of moves) {
        const doll = pickUpDoll(board, column);
        score += handleBasket(basket, doll);
    }
    return score;
}