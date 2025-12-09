function solution(lottos, win_nums) {
    let a = 0;  
    let b = 0;   
    for (i = 0; i < 6; i++){
        if (lottos[i] === 0){
            a++;
        } else {
            for (let j = 0; j < 6; j++){
                if (lottos[i] === win_nums[j])
                b++;
            }
        }
    }
    let c = a + b;
    let d = b;   
    let r = [6, 6, 5, 4, 3, 2, 1];

    return [r[c], r[d]];
}

   
