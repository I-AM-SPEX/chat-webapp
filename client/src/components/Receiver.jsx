import "./Receiver.css";
const Receiver = ({ message }) => {
  return (
    <div className="receiver-message-container">
      <p>{message.text}</p>
      <p className="time-stamp">Time Stamp</p>
    </div>
  );
};

export default Receiver;
