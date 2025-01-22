const filterChatByUserName = (userName, chats) => {
  const currentMessages = chats.filter((chat) => {
    if (chat.userName === userName) return chat.chats;
  });
  return currentMessages[0].chats;
};

const senderOrRecipient = (userId, messageId) => {
  return userId == messageId ? true : false;
};

export { filterChatByUserName, senderOrRecipient };
