import "./ChatPage.css";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import Friend from "../components/Friend";
import { useEffect, useState } from "react";
import { getChats } from "../service/api_service";
import { filterChatByUserName, senderOrRecipient } from "../util/utils";
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);

  const loadChats = (chats) => {
    setChats(chats);
    const currentRecipient = chats[0].userName;
    setCurrentRecipient(currentRecipient);
    const currentRecipientMessages = filterChatByUserName(
      currentRecipient,
      chats,
    );
    setCurrentMessages(currentRecipientMessages);
  };

  const selectedChat = (userName) => {
    const currentRecipient = userName;
    setCurrentRecipient(userName);
    const currentRecipientMessages = filterChatByUserName(
      currentRecipient,
      chats,
    );
    setCurrentMessages(currentRecipientMessages);
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
                <button key={index} onClick={() => selectedChat(chat.userName)}>
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
            <input className="message-input" />
            <button className="message-button">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
