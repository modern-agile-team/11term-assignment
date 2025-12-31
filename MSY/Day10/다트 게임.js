function solution(dartResult) {
    const charConv = {'S':'**1', 'D':'**2', 'T':'**3', '#':'*-1'};
    const result = [];
    
    const parser = dartResult.match(/\d{1,2}[SDT][*#]?/g);

    for (let parse of parser) {
        const origin = parse;
    
        parse = parse.replace(/[SDT#]/g, (ch) => charConv[ch]);
        
        if (origin.includes('*')) {
            parse = parse.slice(0, -1);
            parse += '*2';
            if (result.length > 0) {
                result[result.length - 1] = 
                    '(' + result[result.length - 1].slice(0, -1) + ')*2+';
            }
        }
    
        parse += '+' ; 
        result.push(parse);
    }

    return eval (result.join("").slice(0, -1));
}