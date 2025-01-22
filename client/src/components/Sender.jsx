import "./Sender.css";
const Sender = ({ message }) => {
  return (
    <div className="sender-message-container">
      <p>{message.text}</p>
      <p className="time-stamp">Time Stamp</p>
    </div>
  );
};

export default Sender;
