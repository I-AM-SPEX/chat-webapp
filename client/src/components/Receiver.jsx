import "./Receiver.css";
const Receiver = ({ message }) => {
  console.log(message);
  console.log("the props");

  return (
    <div className="receiver-message-container">
      <p>{message.text}</p>
      <p className="time-stamp">Time Stamp</p>
    </div>
  );
};

export default Receiver;
