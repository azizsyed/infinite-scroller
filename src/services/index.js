import { transformFromAppSpot } from '../schema/transformer';

export default (count = 10, apiToken) => {
  const url = `http://message-list.appspot.com/messages?limit=${count}${apiToken ? `&pageToken=${apiToken}` : ''}`;

  return fetch(url)
    .then(response => response.json())
    .then(response => ({
      messages: transformFromAppSpot(response.messages),
      apiToken: response.pageToken,
    }));
};
