import LoginWindow from './ui/loginWindow';
import MainWindow from './ui/mainWindow';
import UserName from './ui/userName';
import UserList from './ui/userList';
import UserPhoto from './ui/userPhoto';
import MessageList from './ui/messageList';
import MessageSender from './ui/messageSender';
import WSClient from './wsClient';

export default class MegaChat {
  constructor() {
    this.wsClient = new WSClient(
      `ws://localhost:8282/ws`,
      this.onMessage.bind(this)
    );

    this.ui = {
      loginWindow: new LoginWindow(
        document.querySelector('.auth'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('.chat')),
      userName: new UserName(document.querySelector('.user__name')),
      userList: new UserList(document.querySelector('.chat__users-list')),
      messageList: new MessageList(document.querySelector('.chat__messages')),
      messageSender: new MessageSender(
        document.querySelector('.chat__send-form'),
        this.onSend.bind(this)
      ),
      userPhoto: new UserPhoto(
        document.querySelector('.user__photo'),
        this.onUpload.bind(this)
      ),
    };

    this.ui.loginWindow.show();
  }

  onUpload(data) {
    this.ui.userPhoto.set(data);

    fetch('http://localhost:8282/upload-photo', {
      method: 'post',
      body: JSON.stringify({
        name: this.ui.userName.get(),
        image: data,
      }),
    });
  }

  onSend(message) {
    this.wsClient.sendTextMessage(message);
    this.ui.messageSender.clear();
  }

  async onLogin(name) {
    await this.wsClient.connect();
    this.wsClient.sendHello(name);
    this.ui.loginWindow.hide();
    this.ui.mainWindow.show();
    this.ui.userName.set(name);
    this.ui.userPhoto.set(`../photos/${name}.png?t=${Date.now()}`);
  }



  onMessage({ type, from, data }) {
    console.log(type, from, data);

    if (type === 'hello') {
      this.ui.userList.add(from);
      this.ui.messageList.addSystemMessage(`${from} вошел в чат`);
      this.ui.mainWindow.updateUsersCount();
    } else if (type === 'user-list') {
      for (const item of data) {
        this.ui.userList.add(item);
      }
      this.ui.mainWindow.updateUsersCount();
    } else if (type === 'bye-bye') {
      this.ui.userList.remove(from);
      this.ui.messageList.addSystemMessage(`${from} вышел из чата`);
      this.ui.mainWindow.updateUsersCount();
    } else if (type === 'text-message') {
      this.ui.messageList.add(from, data.message);
    } else if (type === 'photo-changed') {
      const avatars = document.querySelectorAll(
        `.user__photo__message.${data.name}`
      );

      for (const avatar of avatars) {
        avatar.style.backgroundImage = `url(./photos/${
          data.name
        }.png?t=${Date.now()})`;
      }
    }
  }
}
