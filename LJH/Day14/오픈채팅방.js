/*uid → 최종 닉네임을 먼저 확정 (Enter/Change만 반영)
다음 Enter/Leave 기록만 최종 닉네임으로 문장 만들어 출력
*/

function solution(record) {
  const NickUI = new Map();

  for (const line of record) {
    const [cmd, uid, nick] = line.split(" ");
    if (cmd === "Enter" || cmd === "Change") {
      NickUI.set(uid, nick);
    }
  }
    
  const result = [];
  for (const line of record) {
    const [cmd, uid] = line.split(" ");

    if (cmd === "Enter") {
      result.push(`${NickUI.get(uid)}님이 들어왔습니다.`);
    } else if (cmd === "Leave") {
      result.push(`${NickUI.get(uid)}님이 나갔습니다.`);
    }
  }

  return result;
}