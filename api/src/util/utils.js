import { ObjectId } from "mongodb";

const filterRecipientId = (userId, chats) => {
  const recipientIds = chats.map((chat) => {
    const chatId = chat.chatId;
    const ids = chatId.split("_");
    return userId === ids[0] ? new ObjectId(ids[1]) : new ObjectId(ids[0]);
  });

  return recipientIds;
};

const mergeUserNameWithChat = (userNames, chats) => {
  const newChats = [];

  for (const user of userNames) {
    for (const chat of chats) {
      const chatId = chat.chatId;
      const ids = chatId.split("_");
      if (user._id.toString() === ids[0]) {
        newChats.push({ userName: user.userName, ...chat });
      } else if (user._id.toString() === ids[1]) {
        newChats.push({ userName: user.userName, ...chat });
      } else {
        continue;
      }
    }
  }

  return newChats;
};

export { filterRecipientId, mergeUserNameWithChat };
