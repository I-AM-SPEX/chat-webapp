import { io } from "../../main.js";
import { addFriendToDb, getAllChats } from "../config/db.js";
import {
  createChat,
  deliverMessage,
  getUserChats,
} from "../service/chat_service.js";
import { getRecipientId } from "../util/utils.js";

//const addFriend = async (req, res) => {
//  const { userName, friendUserName } = req.body;
//  try {
//    if (userName && friendUserName) {
//      const result = await addFriendToDb(userName, friendUserName);
//      if (result.status) {
//        res.status(200).json({ message: result.message });
//      } else {
//        result.status(200).json({ message: result.message });
//      }
//    } else {
//      res;
//    }
//  } catch (error) {
//    console.log("AddFriend Controller Failed", error);
//  }
//};

const newChat = async (req, res) => {
  const { userName, friendUserName } = req.body;
  try {
    if (userName && friendUserName) {
      const result = await createChat(userName, friendUserName);
      if (result.status) {
        res.status(200).json({ message: result.message });
      } else {
        res.status(200).json({ message: result.message });
      }
    } else {
      res.status(200).json({ message: "User names are undefined" });
    }
  } catch (error) { }
};
const newMessage = async (req, res) => {
  const { message, chatId } = req.body;
  try {
    if (message) {
      const result = await deliverMessage(chatId, message);
      if (result.status) {
        console.log(getRecipientId(message.id, chatId));
        io.emit("testing", getRecipientId(message.id, chatId));
        res.status(200).json({ message: result.message });
      } else {
        res.status(200).json({ message: result.message });
      }
    } else {
      res.status(200).json({ message: "Message failed to deliver" });
    }
  } catch (error) {
    console.log("newMessage Controller failed", error);
  }
};

const getChats = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getUserChats(id);
    res.status(200).json({ message: "getChats response", chats: results });
  } catch (error) { }
};
export { newChat, newMessage, getChats };
