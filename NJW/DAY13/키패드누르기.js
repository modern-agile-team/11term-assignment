function solution(numbers, hand) {
    var answer = "";
    let left_pos = 10; // '*'를 10으로 간주
    let right_pos = 12; // '#'를 12로 간주

    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        if (num === 0) num = 11; // 0을 11로 치환하여 계산

        if (num === 1 || num === 4 || num === 7) {
            answer += "L";
            left_pos = num;
        } else if (num === 3 || num === 6 || num === 9) {
            answer += "R";
            right_pos = num;
        } else {
            // 2, 5, 8, 11(0)번 처리
            // 좌표를 쓰지 않고 거리 계산하는 공식
            let dist_l =
                Math.floor(Math.abs(num - left_pos) / 3) +
                (Math.abs(num - left_pos) % 3);
            let dist_r =
                Math.floor(Math.abs(num - right_pos) / 3) +
                (Math.abs(num - right_pos) % 3);

            if (dist_l < dist_r) {
                answer += "L";
                left_pos = num;
            } else if (dist_r < dist_l) {
                answer += "R";
                right_pos = num;
            } else {
                if (hand === "right") {
                    answer += "R";
                    right_pos = num;
                } else {
                    answer += "L";
                    left_pos = num;
                }
            }
        }
    }
    return answer;
}
