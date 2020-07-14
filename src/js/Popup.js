import validateGEO from './validateGEO';

export default class Popup {
  constructor() {
    this.type = '';
    this.result = false;
    this.callback = () => {};
    this.init();
  }

  init() {
    if (typeof document !== 'undefined') {
      this.elPopup = document.createElement('div');
      this.elPopup.className = 'popup hidden';
      this.elPopup.innerHTML = `
    <p class="popup-header"></p>
    <p class="popup-msg"></p>
    <p class="popup-msg-input hidden">Укажите Ваше местоположение вручную. <br> 
      Введите широту и долготу через запятую</p>
    <input type"text" class="popup-inp hidden">
    <p class="popup-msg-warning hidden">Данные указаны не корректно!</p>
    <div class="popup-buttons">
      <div class="popup-cancel button hidden">Отмена</div>
      <div class="popup-ok button">OK</div>
    </div>
    `;
      document.body.appendChild(this.elPopup);

      this.elPopupHeader = document.querySelector('.popup-header');
      this.elPopupMsg = document.querySelector('.popup-msg');
      this.elPopupMsgInput = document.querySelector('.popup-msg-input');
      this.elPopupMsgWarning = document.querySelector('.popup-msg-warning');
      this.elPopupInput = document.querySelector('.popup-inp');
      this.btnCancel = document.querySelector('.popup-cancel');
      this.btnOk = document.querySelector('.popup-ok');
    }

    this.btnOk.addEventListener('click', () => {
      if (this.type === 'get') {
        if (validateGEO(this.elPopupInput.value)) {
          this.result = this.elPopupInput.value;
          this.callback();
          this.closePopup();
        } else {
          this.elPopupMsgWarning.classList.remove('hidden');
        }
      } else {
        this.closePopup();
      }
    });

    this.btnCancel.addEventListener('click', () => {
      this.result = false;
      this.closePopup();
    });

    this.elPopupInput.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') this.btnOk.click();
    });
  }

  showPopup(type, header, msg, callback = () => {}) {
    this.type = type;
    this.elPopup.classList.remove('hidden');
    this.elPopupHeader.innerText = header;
    this.elPopupMsg.innerText = msg;
    this.callback = callback;
    if (this.type === 'get') {
      this.elPopupInput.classList.remove('hidden');
      this.btnCancel.classList.remove('hidden');
      this.elPopupMsgInput.classList.remove('hidden');
    }
    document.getElementById('controll').classList.add('hidden');
  }

  validate() {
    if (validateGEO(this.elPopupInput.value)) {
      this.elPopupInput.style.borderColor = '#000000';
      return true;
    }
    this.elPopupInput.style.borderColor = '#ff0000';
    return false;
  }

  closePopup() {
    this.elPopup.classList.add('hidden');
    this.elPopupHeader.innerText = null;
    this.elPopupMsg.innerText = null;
    this.elPopupInput.value = '';
    if (!this.elPopupInput.classList.contains('hidden')) this.elPopupInput.classList.add('hidden');
    if (!this.btnCancel.classList.contains('hidden')) this.btnCancel.classList.add('hidden');
    if (!this.elPopupMsgInput.classList.contains('hidden')) this.elPopupMsgInput.classList.add('hidden');
    if (!this.elPopupMsgWarning.classList.contains('hidden')) this.elPopupMsgWarning.classList.add('hidden');
    document.getElementById('controll').classList.remove('hidden');
    document.getElementById('buttons-start-rec').classList.remove('hidden');
    document.getElementById('buttons-stop-rec').classList.add('hidden');
  }
}
