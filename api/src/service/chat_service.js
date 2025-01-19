import { ObjectId } from "mongodb";
import { addChat, findUserByUserName } from "../config/db.js";
import { Chat } from "../model/chat.js";
import { Message } from "../model/message.js";

const dileverMessage = async () => { };

const createChat = async (userName, friendUserName) => {
  const friend = await findUserByUserName(friendUserName);
  if (friend) {
    const chatCreationNotification = `${userName} created this chat.`;
    const user = await findUserByUserName(userName);
    const chatId = `${user._id.toString()}_${friend._id.toString()}`;
    const id = new ObjectId();
    const chat = new Chat(id, chatId);
    const message = new Message(
      user._id,
      new Date().toString(),
      chatCreationNotification,
    );
    chat.chats.push(message);
    await addChat(chat);
    return { status: true, message: "Chat Created Successfully." };
  } else {
    return {
      status: false,
      message: "The user does not exist. Invite them to sign up for plain chat",
    };
  }
};

export { createChat };
