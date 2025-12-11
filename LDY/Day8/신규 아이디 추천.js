function solution(new_id) {
  const MAX_LENGTH = 15;
  const MIN_LENGTH = 3;
  // 1단계 : 대문자 치환
  let result = new_id.toLowerCase();
  
  // 2단계 : 알파벳 소문자, 숫자, 특수문자(-, _, .)를 제외한 모든 문자 제거
  result = result.replace(/[^a-z0-9\-_.]/g, "");

  // 3단계 : 연속으로된 마침표 하나로 변경
  result = result.replace(/\.{2,}/g, ".");
  
  // 4단계 : 처음과 끝의 마침표 제거
  result = result.replace(/^\.|\.$/g, "");
  
  // 5단계 : 빈 문자열이면 "a"를 삽입
  result = result || "a";
  
  // 6단계 : 문자 길이가 16자 이상이면 15자로 변경, 변경 후 끝 문자가 마침표이면 제거
  if(result.length > MAX_LENGTH) {
    result = result.substr(0, 15).replace(/\.$/, "");
  }
  
  // 7단계 : 문자 길이가 2자 이하이면 3자로 변경
  if(result.length < MIN_LENGTH) {
    result = result.padEnd(3, result[result.length - 1]);
  }
  
  return result;
}