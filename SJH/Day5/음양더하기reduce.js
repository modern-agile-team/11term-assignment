function solution(absolutes, signs) {
    const answer = absolutes.reduce((plus, iJ, index) => {
        const Ji = signs[index];   
        let realJi;                
        if (jI) {         
            realJi = iJ;
        } else {                   
            realJi = -iJ;
        }
        return plus + realJi;      
    }, 0);   
    return answer;
}
