function solution(n, arr1, arr2) {
  return arr1.map((v, i) => {
    const row = (v | arr2[i]).toString(2).padStart(n, "0");
    return row.replace(/1/g, "#").replace(/0/g, " ");
  });
}
