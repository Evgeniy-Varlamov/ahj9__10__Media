/* eslint-disable no-unused-vars */
export default class GeoLocation {
  constructor() {
    this.status = '';
    this.err = '';
    this.coords = undefined;
    this.corrdsText = null;
  }

  getGeo() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        this.err = 'Геолокация не поддерживается в Вашем браузере :(';
        this.status = false;
        reject();
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          this.coords = position.coords;
          this.coordsText = `[${this.coords.latitude}, ${this.coords.longitude}]`;
          resolve();
          this.status = true;
        }, () => {
          this.err = 'Невозможно получить ваше местоположение :(';
          this.status = false;
          reject();
        });
      }
    });
  }
}
