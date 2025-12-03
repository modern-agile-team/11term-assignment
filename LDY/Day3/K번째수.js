function solution(array, commands) {
  return commands.map((command) => {
    const [startIndex, endIndex, returnIndex] = command;
    return array.slice(startIndex - 1, endIndex).sort((a, b) => a - b)[returnIndex - 1];
  });
}
