/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */

export default class AVRec {
  constructor(popup, timerSpan) {
    this.popup = popup;
    this.chunks = [];
    this.recorder = null;
    this.record = null;
    this.duration = 0;
    this.durationString = null;
    this.timer = null;
    this.recStatus = false;
    this.time = timerSpan;
    this.date = null;
  }

  clear() {
    this.chunks = [];
    this.recorder = null;
    this.record = null;
    this.duration = 0;
    this.durationString = null;
    this.time.textContent = '';
    this.recStatus = false;
    this.date = null;
  }

  async startRecord(type) {
    try {
      if (!navigator.mediaDevices) {
        const title = 'Что-то пошло не так';
        const msg = 'Ваш браузер не поддерживает запись звука';
        this.popup.showPopup('', title, msg);
      }
      if (!window.MediaRecorder) {
        const title = 'Что-то пошло не так';
        const msg = 'Разрешите запись звука в браузере';
        this.popup.showPopup('', title, msg);
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: (type === 'video'),
      });
      if (type === 'video') {
        if (typeof document !== 'undefined') {
          const miniVideo = document.createElement('video');
          miniVideo.controls = true;
          miniVideo.muted = 'muted';
          miniVideo.className = 'mini-video';
          document.body.appendChild(miniVideo);
          miniVideo.srcObject = stream;
          miniVideo.play();
        }
      }
      this.recorder = new MediaRecorder(stream);
      this.recorder.addEventListener('start', () => {
        this.timer = setInterval(() => {
          this.duration += 1;
          let min = Math.trunc(this.duration / 60);
          let sec = this.duration - 60 * min;
          if (min < 10) min = `0${min}`;
          if (sec < 10) sec = `0${sec}`;
          this.time.textContent = `${min}:${sec}`;
        }, 1000);
        this.recStatus = true;
      });
      this.recorder.addEventListener('dataavailable', (evt) => {
        this.chunks.push(evt.data);
      });
      this.recorder.addEventListener('stop', () => {
        const blob = new Blob(this.chunks);
        if (this.record) this.record.src = URL.createObjectURL(blob);
        stream.getTracks().forEach((track) => track.stop());
        this.chunks = [];
        if (typeof document !== 'undefined') {
          const minivideo = document.getElementsByClassName('mini-video')[0];
          if (minivideo) minivideo.remove();
        }
        clearInterval(this.timer);
        this.duration = 0;
        this.durationString = null;
        this.recStatus = false;
      });
      this.recorder.start();
    } catch (error) {
      const title = 'Что-то пошло не так';
      const msg = 'Разрешите запись звука/видео в браузере';
      this.popup.showPopup('', title, msg);
      this.clear();
    }
  }

  async startRecordAudio() {
    if (this.recorder) return;
    this.record = document.createElement('audio');
    await this.startRecord('audio');
  }

  async startRecordVideo() {
    if (this.recorder) return;
    this.record = document.createElement('video');
    await this.startRecord('video');
  }

  recordOk() {
    this.recorder.stop();
    this.recorder = null;
    this.record.controls = true;
    this.date = AVRec.getDate();
  }

  recordCancel() {
    this.recorder.stop();
    this.clear();
  }

  static getDate() {
    const span = document.createElement('span');
    span.classList.add('time');
    span.textContent = new Date().toLocaleString();
    return span;
  }
}
