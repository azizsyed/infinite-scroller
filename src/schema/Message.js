class Message {
  constructor(message) {
    this.timestamp = message.timestamp;
    this.id = message.id;
    this.content = message.content;
    this.user = message.user;
  }
}

export default Message;
