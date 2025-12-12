function solution(absolutes, signs) { 
    let plus = 0;   
    for (let i = 0; i < absolutes.length; i++) {
        const iJ = absolutes[i];  
        const jI = signs[i];      
        let realJi;
        if (ji) {         
            realJi = iJ;          
        } else {
            realJi = -iJ;          
        }
        plus += realJi;            
    }
    return plus;   
}
