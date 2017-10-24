import { transformFromAppSpot } from '../schema/transformer';

let TOKEN = null;

export default (count = 10) => {
  const url = `http://message-list.appspot.com/messages?limit=${count}${TOKEN ? `&pageToken=${TOKEN}` : ''}`;

  return fetch(url)
    .then(response => response.json())
    .then((response) => {
      TOKEN = response.pageToken;
      const newMessages = transformFromAppSpot(response.messages);
      return newMessages;
    });
};
