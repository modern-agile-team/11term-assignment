function solution(s) {
  return s
    .split(" ")
    .map((value) => {
      let result = "";
      for (let i = 0; i < value.length; i++) {
        result += i % 2 === 0 ? value[i].toUpperCase() : value[i].toLowerCase();
      }
      return result;
    })
    .join(" ");
}
