import { addFriendToDb } from "../config/db.js";
import { createChat } from "../service/chat_service.js";

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
const addMessage = async (req, res) => { };
export { newChat, addMessage };
