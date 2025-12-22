function solution(records) {
  const userList = {};

  addUserList(records, userList);

  return addMessageList(records, userList)
}

function addUserList(records, userList) {
  for (const record of records) {
    const [status, uid, name] = splitMessage(record);
    if (status === "Enter" || status === "Change") {
      userList[uid] = name;
    } 
  }
}

function addMessageList(records, userList) {
  const messageList = [];
  
  for (const record of records) {
    const [status, uid] = splitMessage(record);
    if (status === "Enter")
      messageList.push(`${userList[uid]}님이 들어왔습니다.`);
    else if (status === "Leave")
      messageList.push(`${userList[uid]}님이 나갔습니다.`);
  }
  
  return messageList;
}

function splitMessage(message) {
  return message.split(" ");
}