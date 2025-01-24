import axios from "axios";

const BASE_URI = import.meta.env.VITE_API_BASE_URI;

const axiosInstance = axios.create({
  baseURL: BASE_URI,
  headers: { "Content-Type": "application/json" },
});

const getChats = async (userId) => {
  try {
    const response = await axiosInstance.get(`/chat/${userId}`);
    const chats = response.data.chats;
    return chats;
  } catch (error) {
    console.error("GetChats function failed", error);
  }
};

const sendMessage = async (chatId, message) => {
  try {
    const payLoad = { message, chatId };
    const response = await axiosInstance.post("/chat/newMessage", payLoad);
  } catch (error) {
    console.error("sendMessage function failed", error);
  }
};

const addFriend = async (newChat) => {
  try {
    const payLoad = newChat;
    const response = await axiosInstance.post("/chat/newChat", payLoad);
    return response;
  } catch (error) {
    console.log("addFriend function failed", error);
  }
};

export { getChats, sendMessage, addFriend };
