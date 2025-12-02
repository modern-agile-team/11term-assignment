function solution(n) {
    let answer = "";
    console.log(n)
    console.log(n.length)
    for (let i = 0; i < n; i++) {      
        if(i % 2 === 1) {
            answer += "박";
        }
        if(i % 2 === 0) {
            answer += "수";
        }
    }
    return answer;
}