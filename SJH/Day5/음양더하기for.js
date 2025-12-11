function solution(absolutes, signs) { 
    let plus = 0;   
    for (let i = 0; i < absolutes.length; i++) {
        const ij = absolutes[i];  
        const ji = signs[i];      
        let realji;
        if (ji === true) {         
            realji = ij;          
        } else {
            realji = -ij;          
        }
        plus += realji;            
    }
    return plus;   
}
