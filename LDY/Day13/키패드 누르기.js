const KEY_POSITION = {
  1: [0, 0], 2: [0, 1], 3: [0, 2],
  4: [1, 0], 5: [1, 1], 6: [1, 2],
  7: [2, 0], 8: [2, 1], 9: [2, 2],
  "*": [3, 0], 0: [3, 1],  "#": [3, 2], 
}

function solution(numbers, hand) {
  const currentPosition = { left: KEY_POSITION["*"], right: KEY_POSITION["#"] };
  
  return numbers.map((number) => pressKey(number, hand, currentPosition)).join("");
}

function pressKey(number, hand, currentPosition) {
  const targetKey = KEY_POSITION[number];
  
  if (/1|4|7/.test(number)) {
    return editPosition(currentPosition, targetKey, "L");
  } else if (/3|6|9/.test(number)) {
    return editPosition(currentPosition, targetKey, "R");
  } 

  return findNearHand(currentPosition, targetKey, hand);
}

function editPosition(currentPosition, targetKey, hand) {
  if (hand === "L") {
    currentPosition.left = targetKey;
  } else {
    currentPosition.right = targetKey;
  }
  
  return hand;
}

function findNearHand(currentPosition, targetKey, hand) {
  const leftDist = getDistance(currentPosition.left, targetKey);
  const rightDist = getDistance(currentPosition.right, targetKey);

  if (leftDist < rightDist) {
    return editPosition(currentPosition, targetKey, "L");
  } else if(leftDist > rightDist) {
    return editPosition(currentPosition, targetKey, "R");
  }

  if (hand === "left") {
    return editPosition(currentPosition, targetKey, "L");
  } else {
    return editPosition(currentPosition, targetKey, "R");
  }
}

function getDistance(position1, position2) {
  return Math.abs(position1[0] - position2[0]) + Math.abs(position1[1] - position2[1])
}