import "./ChatPage.css";
import Sender from "../components/Sender";
import Receiver from "../components/Receiver";
import Friend from "../components/Friend";
import { useCallback, useEffect, useState } from "react";
import { addFriend, getChats, sendMessage } from "../service/api_service";
import { filterChatByUserName, senderOrRecipient } from "../util/utils";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000");
const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatId, setChatId] = useState("");
  const [trigger, setTrigger] = useState("");
  const [initChat, setInitChat] = useState(true);

  const loadChats = (updatedChats) => {
    //console.log(updatedChats, "here is loadChats updatedChats");
    //const selectedRecipient =
    //  currentRecipient === null ? updatedChats[0] : currentRecipient;
    //console.log(selectedRecipient, "selectedRecipient");
    //const currentChatId = selectedRecipient.chatId;
    //
    //const currentRecipientMessages = filterChatByUserName(
    //  selectedRecipient.userName,
    //  updatedChats,
    //);
    //setCurrentRecipient(selectedRecipient);
    //setChatId(currentChatId);
    //setCurrentMessages(currentRecipientMessages);

    setChats(updatedChats);
    setInitChat(true);
  };

  const intializeChat = () => {
    if (chats.length > 0 && initChat) {
      let selectedRecipient;
      let selectedRecipientChatId;
      let selectedRecipientUserName;
      if (currentRecipient === "") {
        selectedRecipient = chats[0];
        selectedRecipientChatId = selectedRecipient.chatId;
        selectedRecipientUserName = selectedRecipient.userName;
      } else {
        selectedRecipientChatId = chatId;
        selectedRecipientUserName = currentRecipient;
      }

      console.log(selectedRecipient, "selectedRecipient");
      console.log(
        "chats fromm init chat after message sent",
        selectedRecipientUserName,
      );

      const currentRecipientMessages = filterChatByUserName(
        selectedRecipientUserName,
        chats,
      );
      setCurrentRecipient(selectedRecipientUserName);
      setChatId(selectedRecipientChatId);
      setCurrentMessages(currentRecipientMessages);
      setInitChat(false);
    } else {
      console.log(initChat, "this is initChat");
    }
  };
  const selectedChat = (selectedUserName, selectedChatId) => {
    const currentRecipientMessages = filterChatByUserName(
      selectedUserName,
      chats,
    );
    setCurrentMessages(currentRecipientMessages);
    setCurrentRecipient(selectedUserName);
    setChatId(selectedChatId);
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() != "") {
      const message = {
        id: "678c14c5e8ac828a4ffc36e1",
        timeStamp: new Date().toString(),
        text: messageInput,
      };
      console.log(currentRecipient, "currentRecipient from handleSendMessage");
      console.log(chatId, "from handleSendMessage");
      await sendMessage(chatId, message).then(() => {
        setMessageInput("");
        setTrigger(Math.random());
      });
    } else {
      alert("Empty Input Field");
    }
  };

  const handleAddFriend = async () => {
    const friendUserName = prompt("Enter Friend's UserName").trim();
    console.log("here is the friend user name sam", friendUserName);
    const newChat = { userName: "spex", friendUserName };
    console.log(newChat);
    const response = await addFriend(newChat);
    alert(response.data.message);
  };
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await getChats("678c14c5e8ac828a4ffc36e1");
        loadChats(response);

        console.log(response);
        console.log("get chats response");
      } catch (error) {
        console.error("fetchChats function failed", error);
      }
    };
    console.log("The useEffect runs how many times");
    socket.on("testing", (data) => {
      if (data == "678c14c5e8ac828a4ffc36e1") {
        console.log("it works dummy");
        setTrigger(Math.random() * 10);
      } else {
        console.log("it might work");
      }
    });
    fetchChats();
  }, [trigger]);

  intializeChat();
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
            <button className="add-friend-button" onClick={handleAddFriend}>
              Add Friend
            </button>
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
