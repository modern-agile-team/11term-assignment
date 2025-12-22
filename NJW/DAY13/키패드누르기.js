function solution(numbers, hand) {
    var answer = "";
    let left_pos = 10;
    let right_pos = 12;

    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];

        if (num === 0) num = 11;
        if (num === 1 || num === 4 || num === 7) {
            answer += "L";
            left_pos = num;
        } else if (num === 3 || num === 6 || num === 9) {
            answer += "R";
            right_pos = num;
        } else {
            if (num === 0) {
                num = 11;

                let dist_l =
                    parseInt(Math.abs(num - left_pos) / 3) +
                    parseInt(Math.abs(num - left_pos) % 3);
                let dist_r =
                    parseInt(Math.abs(num - right_pos) / 3) +
                    parseInt(Math.abs(num - right_pos) % 3);

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
    }

    return answer;
}
