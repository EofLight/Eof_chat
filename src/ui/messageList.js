import { sanitize } from '../utils';

export default class MessageList {
  constructor(element) {
    this.element = element;
  }

  add(from, text) {
    const clientName=document.querySelector('.user__name');
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    const item = document.createElement('li');
    if (clientName.textContent === from) item.classList.add('chat__message--me');
    else item.classList.add('chat__message--they');
    item.classList.add('chat__message');
    item.innerHTML = `
    <div 
    style="background-image: url(../photos/${from}.png?t=${Date.now()})"
    class="user__photo__message ${sanitize(from)}"></div>
                <div class="messages__block">
                  <div class="user__name">${sanitize(from)}</div>
                  <div class="message">
                    <div class="message__text">${sanitize(text)}</div>
                    <div class="message__time">${time}</div>
                  </div>
                </div>
                `;
    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
  }

  addSystemMessage(message) {
    const item = document.createElement('div');

    item.classList.add('message-item', 'message-item-system');
    item.textContent = message;

    this.element.append(item);
    this.element.scrollTop = this.element.scrollHeight;
  }
}
