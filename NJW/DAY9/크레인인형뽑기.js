function solution(board, moves) {
    let stack = [];
    var answer = 0;

    // move 인덱스를 불러와서
    for (const move of moves) {
        // 인덱스의 시작은 0번부터 시작이니 1을 뺴주고
        const cols = move - 1;
        // 반복문을 통해 board를 가지고와서
        for (let i = 0; i < board.length; i++) {
            // 만약에 board에 x y 좌표가 0이 아니면
            if (board[i][cols] != 0) {
                // 스택에서 중복되는 값들 제거
                if (
                    (stack.length > 0 && stack[stack.length - 1]) ==
                    board[i][cols]
                ) {
                    // 중복되면 2점씩 추가
                    stack.pop();
                    answer += 2;
                } else {
                    // 아닐 경우 배열에 추가
                    stack.push(board[i][cols]);
                }

                // 꺼냈던 인형 없애기
                board[i][cols] = 0;
                break;
            }
        }
    }
    return answer;
}
