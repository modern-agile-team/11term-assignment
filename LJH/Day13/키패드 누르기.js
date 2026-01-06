function solution(numbers, hand) {
  const pos = {
    1: [0,0], 2: [1,0], 3: [2,0],
    4: [0,1], 5: [1,1], 6: [2,1],
    7: [0,2], 8: [1,2], 9: [2,2],
    '*': [0,3], 0: [1,3], '#': [2,3]
  };

  let left = '*';
  let right = '#';
  let answer = '';

  for (const num of numbers) {

    if ([1,4,7].includes(num)) {
      answer += 'L';
      left = num;
      continue;
    }

    if ([3,6,9].includes(num)) {
      answer += 'R';
      right = num;
      continue;
    }

    const [lx, ly] = pos[left];
    const [rx, ry] = pos[right];
    const [nx, ny] = pos[num];

    const leftDist = Math.abs(lx - nx) + Math.abs(ly - ny);
    const rightDist = Math.abs(rx - nx) + Math.abs(ry - ny);

    if (leftDist < rightDist) {
      answer += 'L';
      left = num;
    } else if (leftDist > rightDist) {
      answer += 'R';
      right = num;
    } else {
      if (hand === 'left') {
        answer += 'L';
        left = num;
      } else {
        answer += 'R';
        right = num;
      }
    }
  }

  return answer;
}