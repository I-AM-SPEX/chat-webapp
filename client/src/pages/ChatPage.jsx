import "./ChatPage.css";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import Friend from "../components/Friend";
import { useEffect, useState } from "react";
import { getChats, sendMessage } from "../service/api_service";
import { filterChatByUserName, senderOrRecipient } from "../util/utils";
import { data } from "react-router-dom";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatId, setChatId] = useState("");

  const loadChats = (chats) => {
    setChats(chats);
    const currentRecipient = chats[0].userName;
    const currentChatId = chats[0].chatId;
    setCurrentRecipient(currentRecipient);
    setChatId(currentChatId);
    const currentRecipientMessages = filterChatByUserName(
      currentRecipient,
      chats,
    );
    setCurrentMessages(currentRecipientMessages);
  };

  const selectedChat = (userName, chatId) => {
    const currentRecipient = userName;
    const currentChatId = chatId;
    setCurrentRecipient(userName);
    setChatId(currentChatId);
    const currentRecipientMessages = filterChatByUserName(
      currentRecipient,
      chats,
    );
    setCurrentMessages(currentRecipientMessages);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() != "") {
      const message = {
        id: "678c14c5e8ac828a4ffc36e1",
        timeStamp: new Date().toString(),
        text: messageInput,
      };
      const currentChatId = chatId;

      const newMessagePromise = new Promise((myResolve, myReject) => {
        sendMessage(currentChatId, message);
        myResolve(true);
        myReject(false);
      });

      newMessagePromise
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      alert("Empty Input Field");
    }
  };
  useEffect(() => {
    const chatsPromise = new Promise((myResolve, myReject) => {
      const results = getChats("678c14c5e8ac828a4ffc36e1");
      if (results) {
        myResolve(results);
      }
      myReject("Hello error");
    });
    chatsPromise
      .then((data) => loadChats(data))
      .catch((error) => {
        console.error("UseEffect failed", error);
      });
  }, []);
  return (
    <div id="page">
      <div className="container">
        <div className="chats">
          <div className="friends-list">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <button
                  key={index}
                  onClick={() => selectedChat(chat.userName, chat.chatId)}
                >
                  {chat.userName}
                </button>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div>
            <button className="add-friend-button">Add Friend</button>
          </div>
        </div>
        <div className="chatView">
          <div className="messages-container">
            {chats.length > 0 ? (
              currentMessages.map((message, index) =>
                senderOrRecipient("678c14c5e8ac828a4ffc36e1", message._id) ? (
                  <Sender key={index} message={message} />
                ) : (
                  <Receiver key={index} message={message} />
                ),
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="message-input-container">
            <input
              className="message-input"
              id="messageInput"
              name="messageInput"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button className="message-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
