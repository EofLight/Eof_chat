export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;
    this.messageInput = element.querySelector("#send__message-text");
    this.messageSendButton = element.querySelector(".send__form-button");

    this.messageSendButton.addEventListener("click", (e) => {
      e.preventDefault();
      const message = this.messageInput.value.trim();

      if (message) {
        this.onSend(message);
      }
    });
  }

  clear() {
    this.messageInput.value = "";
  }
}
