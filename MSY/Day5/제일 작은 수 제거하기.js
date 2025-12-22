function solution(arr) {
  if (arr.length === 1) {
    return [-1];
  }

  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) { 
      min = arr[i];
    }
  }

  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== min) {
      result.push(arr[i]);
    }
  }

  return result;
}
