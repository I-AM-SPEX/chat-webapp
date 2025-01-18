import { addFriendToDb } from "../config/db.js";

const addFriend = async (req, res) => {
  const { userName, friendUserName } = req.body;
  try {
    if (userName && friendUserName) {
      const result = await addFriendToDb(userName, friendUserName);
      if (result.status) {
        res.status(200).json({ message: result.message });
      } else {
        result.status(200).json({ message: result.message });
      }
    } else {
      res;
    }
  } catch (error) {
    console.log("AddFriend Controller Failed", error);
  }
};

export { addFriend };
