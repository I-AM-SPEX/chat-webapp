class Message {
  constructor(id, timeStamp, text) {
    this._id = id;
    this.timeStamp = new Date(timeStamp);
    this.text = text;
  }
}

export { Message };
