!function(t){var e={};function s(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=e,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(n,i,function(e){return t[e]}.bind(null,i));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s(s.s=6)}([function(t,e){t.exports='<!doctype html> <html lang=en> <head> <meta charset=UTF-8> <meta name=viewport content="width=device-width,initial-scale=1"> <meta http-equiv=X-UA-Compatible content="ie=edge"> <title>Document</title> </head> <body> <div class=container> <div id=messages-list> </div> <div id=controll> <input id=input type=text> <div id=buttons-start-rec class=btn-block> <div id=audio-start-btn class=av></div> <div id=video-start-btn class=av></div> </div> <div id=buttons-stop-rec class="btn-block hidden"> <div id=ok-btn class=av></div> <span id=timer></span> <div id=cancel-btn class=av></div> </div> </div> </div> </body> </html> '},function(t,e,s){},function(t,e,s){t.exports=s.p+"phone.png"},function(t,e,s){t.exports=s.p+"video.png"},function(t,e,s){t.exports=s.p+"ok.png"},function(t,e,s){t.exports=s.p+"cancel.png"},function(t,e,s){"use strict";s.r(e);s(0),s(1);class n{constructor(t,e){this.popup=t,this.chunks=[],this.recorder=null,this.record=null,this.duration=0,this.durationString=null,this.timer=null,this.recStatus=!1,this.time=e,this.date=null}clear(){this.chunks=[],this.recorder=null,this.record=null,this.duration=0,this.durationString=null,this.time.textContent="",this.recStatus=!1,this.date=null}async startRecord(t){try{if(!navigator.mediaDevices){const t="Что-то пошло не так",e="Ваш браузер не поддерживает запись звука";this.popup.showPopup("",t,e)}if(!window.MediaRecorder){const t="Что-то пошло не так",e="Разрешите запись звука в браузере";this.popup.showPopup("",t,e)}const e=await navigator.mediaDevices.getUserMedia({audio:!0,video:"video"===t});if("video"===t&&"undefined"!=typeof document){const t=document.createElement("video");t.controls=!0,t.muted="muted",t.className="mini-video",document.body.appendChild(t),t.srcObject=e,t.play()}this.recorder=new MediaRecorder(e),this.recorder.addEventListener("start",()=>{this.timer=setInterval(()=>{this.duration+=1;let t=Math.trunc(this.duration/60),e=this.duration-60*t;t<10&&(t="0"+t),e<10&&(e="0"+e),this.time.textContent=`${t}:${e}`},1e3),this.recStatus=!0}),this.recorder.addEventListener("dataavailable",t=>{this.chunks.push(t.data)}),this.recorder.addEventListener("stop",()=>{const t=new Blob(this.chunks);if(this.record&&(this.record.src=URL.createObjectURL(t)),e.getTracks().forEach(t=>t.stop()),this.chunks=[],"undefined"!=typeof document){const t=document.getElementsByClassName("mini-video")[0];t&&t.remove()}clearInterval(this.timer),this.duration=0,this.durationString=null,this.recStatus=!1}),this.recorder.start()}catch(t){const e="Что-то пошло не так",s="Разрешите запись звука/видео в браузере";this.popup.showPopup("",e,s),this.clear()}}async startRecordAudio(){this.recorder||(this.record=document.createElement("audio"),await this.startRecord("audio"))}async startRecordVideo(){this.recorder||(this.record=document.createElement("video"),await this.startRecord("video"))}recordOk(){this.recorder.stop(),this.recorder=null,this.record.controls=!0,this.date=n.getDate()}recordCancel(){this.recorder.stop(),this.clear()}static getDate(){const t=document.createElement("span");return t.classList.add("time"),t.textContent=(new Date).toLocaleString(),t}}function i(t){return-1!==t.search(/^(\[?-?)((\d|[0-8]\d?|90)\.\d{4,}), ?(-|−)?((\d|\d\d|1[0-7][0-9]|180)\.\d{4,})(\]?)$/)}class o{constructor(){this.type="",this.result=!1,this.callback=()=>{},this.init()}init(){"undefined"!=typeof document&&(this.elPopup=document.createElement("div"),this.elPopup.className="popup hidden",this.elPopup.innerHTML='\n    <p class="popup-header"></p>\n    <p class="popup-msg"></p>\n    <p class="popup-msg-input hidden">Укажите Ваше местоположение вручную. <br> \n      Введите широту и долготу через запятую</p>\n    <input type"text" class="popup-inp hidden">\n    <p class="popup-msg-warning hidden">Данные указаны не корректно!</p>\n    <div class="popup-buttons">\n      <div class="popup-cancel button hidden">Отмена</div>\n      <div class="popup-ok button">OK</div>\n    </div>\n    ',document.body.appendChild(this.elPopup),this.elPopupHeader=document.querySelector(".popup-header"),this.elPopupMsg=document.querySelector(".popup-msg"),this.elPopupMsgInput=document.querySelector(".popup-msg-input"),this.elPopupMsgWarning=document.querySelector(".popup-msg-warning"),this.elPopupInput=document.querySelector(".popup-inp"),this.btnCancel=document.querySelector(".popup-cancel"),this.btnOk=document.querySelector(".popup-ok")),this.btnOk.addEventListener("click",()=>{"get"===this.type?i(this.elPopupInput.value)?(this.result=this.elPopupInput.value,this.callback(),this.closePopup()):this.elPopupMsgWarning.classList.remove("hidden"):this.closePopup()}),this.btnCancel.addEventListener("click",()=>{this.result=!1,this.closePopup()}),this.elPopupInput.addEventListener("keydown",t=>{"Enter"===t.code&&this.btnOk.click()})}showPopup(t,e,s,n=(()=>{})){this.type=t,this.elPopup.classList.remove("hidden"),this.elPopupHeader.innerText=e,this.elPopupMsg.innerText=s,this.callback=n,"get"===this.type&&(this.elPopupInput.classList.remove("hidden"),this.btnCancel.classList.remove("hidden"),this.elPopupMsgInput.classList.remove("hidden")),document.getElementById("controll").classList.add("hidden")}validate(){return i(this.elPopupInput.value)?(this.elPopupInput.style.borderColor="#000000",!0):(this.elPopupInput.style.borderColor="#ff0000",!1)}closePopup(){this.elPopup.classList.add("hidden"),this.elPopupHeader.innerText=null,this.elPopupMsg.innerText=null,this.elPopupInput.value="",this.elPopupInput.classList.contains("hidden")||this.elPopupInput.classList.add("hidden"),this.btnCancel.classList.contains("hidden")||this.btnCancel.classList.add("hidden"),this.elPopupMsgInput.classList.contains("hidden")||this.elPopupMsgInput.classList.add("hidden"),this.elPopupMsgWarning.classList.contains("hidden")||this.elPopupMsgWarning.classList.add("hidden"),document.getElementById("controll").classList.remove("hidden"),document.getElementById("buttons-start-rec").classList.remove("hidden"),document.getElementById("buttons-stop-rec").classList.add("hidden")}}class d{constructor(){this.status="",this.err="",this.coords=void 0,this.corrdsText=null}getGeo(){return new Promise((t,e)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition(e=>{this.coords=e.coords,this.coordsText=`[${this.coords.latitude}, ${this.coords.longitude}]`,t(),this.status=!0},()=>{this.err="Невозможно получить ваше местоположение :(",this.status=!1,e()}):(this.err="Геолокация не поддерживается в Вашем браузере :(",this.status=!1,e())})}}if(document){const t=document.getElementById("messages-list"),e=document.getElementById("input"),s=document.getElementById("audio-start-btn"),i=document.getElementById("video-start-btn"),r=document.getElementById("ok-btn"),c=document.getElementById("timer"),a=document.getElementById("cancel-btn"),l=document.getElementById("buttons-start-rec"),u=document.getElementById("buttons-stop-rec"),p=new o,h=new n(p,c),m=new d,v=[];try{localStorage.getItem("messagesList")&&(t.innerHTML=JSON.parse(localStorage.getItem("messagesList")))}catch(t){localStorage.clear(),p.showPopup("","Что-то пошло не так","Невозможно загрузить данные из хранилища")}s.addEventListener("click",async()=>{l.classList.add("hidden"),await h.startRecordAudio(),u.classList.remove("hidden")}),i.addEventListener("click",async()=>{l.classList.add("hidden"),await h.startRecordVideo(),u.classList.remove("hidden")}),r.addEventListener("click",()=>{l.classList.remove("hidden"),u.classList.add("hidden"),h.recordOk(),m.getGeo().then(()=>{g(h.record,h.date,m.coordsText)},()=>{p.showPopup("get","Что-то пошло не так",m.err,()=>{g(h.record,h.date,p.result)})})}),a.addEventListener("click",()=>{l.classList.remove("hidden"),u.classList.add("hidden"),h.recordCancel()}),e.addEventListener("keydown",async t=>{if("Enter"!==t.code)return;const e=document.createElement("p");e.textContent=t.target.value;const s=n.getDate();m.getGeo().then(()=>{g(e,s,m.coordsText)},()=>{p.showPopup("get","Что-то пошло не так",m.err,()=>{g(e,s,p.result)})})});const g=(s,n,i)=>{const o=function(t,e,s){const n=document.createElement("div");n.classList.add("msg");const i=document.createElement("div");i.classList.add("msg__content-block"),i.append(t),i.append(e);const o=document.createElement("div");return o.classList.add("msg__geo"),o.innerText=s,n.append(i),n.append(o),n}(s,n,i);v.unshift(o),t.append(o),localStorage.setItem("messagesList",JSON.stringify(t.innerHTML)),e.value=""}}s(2),s(3),s(4),s(5)}]);