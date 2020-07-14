/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-return */
/* eslint-disable class-methods-use-this */
// import ArrData from './ArrData.js';
// import DisplayForm from './DisplayForm.js';

import AVRec from './AVRec';
import Popup from './Popup';
import createMessage from './createMessage';
import GeoLocation from './GeoLocation';

if (document) {
  const messagesList = document.getElementById('messages-list');
  const input = document.getElementById('input');
  const btnRecAudio = document.getElementById('audio-start-btn');
  const btnRecVideo = document.getElementById('video-start-btn');
  const btnOk = document.getElementById('ok-btn');
  const timer = document.getElementById('timer');
  const btnCancel = document.getElementById('cancel-btn');
  const startRec = document.getElementById('buttons-start-rec');
  const stoptRec = document.getElementById('buttons-stop-rec');

  const popup = new Popup();
  const avRec = new AVRec(popup, timer);
  const geoLoc = new GeoLocation();
  const messages = [];

  try {
    if (localStorage.getItem('messagesList')) messagesList.innerHTML = JSON.parse(localStorage.getItem('messagesList'));
  } catch (error) {
    localStorage.clear();
    popup.showPopup('', 'Что-то пошло не так', 'Невозможно загрузить данные из хранилища');
  }

  btnRecAudio.addEventListener('click', async () => {
    startRec.classList.add('hidden');
    await avRec.startRecordAudio();
    stoptRec.classList.remove('hidden');
  });

  btnRecVideo.addEventListener('click', async () => {
    startRec.classList.add('hidden');
    await avRec.startRecordVideo();
    stoptRec.classList.remove('hidden');
  });

  btnOk.addEventListener('click', () => {
    startRec.classList.remove('hidden');
    stoptRec.classList.add('hidden');
    avRec.recordOk();
    geoLoc.getGeo().then(() => {
      addMessage(avRec.record, avRec.date, geoLoc.coordsText);
    }, () => {
      popup.showPopup('get', 'Что-то пошло не так', geoLoc.err, () => {
        addMessage(avRec.record, avRec.date, popup.result);
      });
    });
  });

  btnCancel.addEventListener('click', () => {
    startRec.classList.remove('hidden');
    stoptRec.classList.add('hidden');
    avRec.recordCancel();
  });

  input.addEventListener('keydown', async (event) => {
    if (event.code !== 'Enter') return;
    const p = document.createElement('p');
    p.textContent = event.target.value;
    const date = AVRec.getDate();
    geoLoc.getGeo().then(() => {
      addMessage(p, date, geoLoc.coordsText);
    }, () => {
      popup.showPopup('get', 'Что-то пошло не так', geoLoc.err, () => {
        addMessage(p, date, popup.result);
      });
    });
  });

  const addMessage = (msg, date, geo) => {
    const newMessage = createMessage(msg, date, geo);
    messages.unshift(newMessage);
    messagesList.append(newMessage);
    localStorage.setItem('messagesList', JSON.stringify(messagesList.innerHTML));
    input.value = '';
  };
}
