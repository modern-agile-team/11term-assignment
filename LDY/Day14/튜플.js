function solution(s) {
  const parsedSetList = parseSetList(s);
  const sortedSetList = sortByLength(parsedSetList);
  
  return addSetOfNumber(sortedSetList)
}

function addSetOfNumber(sortedSetList) {
  const tuple = new Set();
  for (set of sortedSetList) {
    set.forEach(number => tuple.add(parseInt(number)));
  }
  
  return Array.from(tuple);
}

function parseSetList(setListStr) {
  const devidedSetList = setListStr.replace(/^{|}$/g, "").match(/\{[^}]*\}/g);
  return devidedSetList.map(set => set.match(/(\d+)/g));
}

function sortByLength(setList) {
  return setList.sort((a, b) => (a.length - b.length));
}