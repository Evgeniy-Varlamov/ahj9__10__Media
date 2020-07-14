export default function createMessage(content, date, geo) {
  const blockMsg = document.createElement('div');
  blockMsg.classList.add('msg');

  const blockContent = document.createElement('div');
  blockContent.classList.add('msg__content-block');
  blockContent.append(content);
  blockContent.append(date);

  const blockGeo = document.createElement('div');
  blockGeo.classList.add('msg__geo');
  blockGeo.innerText = geo;

  blockMsg.append(blockContent);
  blockMsg.append(blockGeo);
  return blockMsg;
}
