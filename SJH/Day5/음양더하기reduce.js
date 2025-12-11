function solution(absolutes, signs) {
    const answer = absolutes.reduce((plus, ij, index) => {
        const ji = signs[index];   
        let realji;                
        if (ji === true) {         
            realji = ij;
        } else {                   
            realji = -ij;
        }
        return plus + realji;      
    }, 0);   
    return answer;
}
