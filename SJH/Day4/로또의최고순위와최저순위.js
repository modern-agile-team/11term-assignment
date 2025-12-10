function solution(lottos, win_nums) {
    let digits = 0;  
    let question = 0;   
    for (i = 0; i < 6; i++){
        if (lottos[i] === 0){
            digits++;
        } else {
            for (let j = 0; j < 6; j++){
                if (lottos[i] === win_nums[j])
                question++;
            }
        }
    }
    const best = digits + question;
    const worst = question;   
    const rank = [6, 6, 5, 4, 3, 2, 1];

    return [rank[best], rank[worst]];
}

   
