function solution(s) {
  return s
    .split(" ")
    .map((value) => convertStr(value))
    .join(" ");
}

function convertStr(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
  }

  return result;
}
