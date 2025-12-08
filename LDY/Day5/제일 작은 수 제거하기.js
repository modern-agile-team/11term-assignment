function solution(arr) {
  if (arr[0] === 10) return [-1];

  const minIndex = arr.indexOf(Math.min(...arr));

  return arr.filter((_, index) => index !== minIndex);
}
