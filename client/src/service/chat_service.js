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
    console.log(chats);
    return chats;
  } catch (error) {
    console.error("GetChats function failed", error);
  }
};

export { getChats };
