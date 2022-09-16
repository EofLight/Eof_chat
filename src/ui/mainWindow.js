export default class MainWindow {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
  updateUsersCount(){
    const usersL=document.querySelector('.chat__users-list');
      const usersCount=usersL.querySelectorAll('.user__name');
      const element = document.querySelector('.title__members');
      element.textContent=`Участников: ${usersCount.length}`;
  }
}
