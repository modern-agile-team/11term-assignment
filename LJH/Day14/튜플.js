/*시도
문자열에서 {{ }} 벗기고
},{ 기준으로 집합 문자열들을 분리
각 집합을 숫자 배열로 변환
집합들을 길이 오름차순 정렬
visited(Set)로 이미 뽑은 숫자 체크하면서, 각 집합에서 처음 보는 숫자를 답에 추가
*/
function solution(s) {
    
  const inner = s.slice(2, -2);
  const parts = inner.split("},{");
  const sets = parts.map(p => p.split(",").map(Number));

  sets.sort((a, b) => a.length - b.length);

  const seen = new Set();
  const answer = [];

  for (const arr of sets) {
    for (const x of arr) {
      if (!seen.has(x)) {
        seen.add(x);
        answer.push(x);
        break; 
      }
    }
  }

  return answer;
}