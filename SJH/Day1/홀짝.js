function solution(num) {
    var answer = '';
    if(num % 2 == 0) {
        answer = "Even";
    }
    if (num % 2 == 1) {
        answer = "Odd";
    }
        
    return answer;
}