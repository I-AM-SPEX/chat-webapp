import { ObjectId } from "mongodb";
import {
  addChat,
  addMessage,
  findChatByChatId,
  findUserByUserName,
  getAllChats,
  getUserNames,
} from "../config/db.js";
import { Chat } from "../model/chat.js";
import { Message } from "../model/message.js";
import {
  filterChatByUserId,
  filterRecipientId,
  mergeUserNameWithChat,
} from "../util/utils.js";

const deliverMessage = async (chatId, newMessage) => {
  const { id, timeStamp, text } = newMessage;
  try {
    const message = new Message(id, timeStamp, text);
    const chat = await findChatByChatId(chatId);
    const chats = chat.chats;
    const chatsCopy = [...chats];
    chatsCopy.push(message);
    await addMessage(chatId, chatsCopy);
    return { status: true, message: "Message Delivered" };
  } catch (error) {
    console.log("diliver message failed", error);
    return { status: false, message: "Message failed to deliver" };
  }
};

const createChat = async (userName, friendUserName) => {
  try {
    const isChat = await chatExists(userName, friendUserName);
    if (!isChat) {
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
          message:
            "The user does not exist. Invite them to sign up for plain chat",
        };
      }
    } else {
      return {
        status: false,
        message: "You already have a chat with this user",
      };
    }
  } catch (error) {
    console.log("CreateChat function failed", error);
  }
};

const chatExists = async (userName, friendUserName) => {
  try {
    const user = await findUserByUserName(userName);
    const friend = await findUserByUserName(friendUserName);
    const comboOne = `${user._id.toString()}_${friend._id.toString()}`;
    const comboTwo = `${friend._id.toString()}_${user._id.toString()}`;
    if (await findChatByChatId(comboOne)) {
      console.log("found chat");
      return true;
    } else if (await findChatByChatId(comboTwo)) {
      return true;
    } else {
      console.log("did not find chat");
      return false;
    }
  } catch (error) {
    console.error("chatExist function failed");
  }
};

const getUserChats = async (userId) => {
  const allChats = await getAllChats();
  const userChats = filterChatByUserId(userId, allChats);
  const recipientIds = filterRecipientId(userId, userChats);
  const userNames = await getUserNames(recipientIds);
  const chatsWithUsernames = mergeUserNameWithChat(userNames, userChats);
  return chatsWithUsernames;
};
export { createChat, deliverMessage, getUserChats };
