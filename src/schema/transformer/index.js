import shortid from 'shortid';
import moment from 'moment';
import Message from '../Message';

export const createMockMessage = message => new Message({
  timestamp: message.timestamp || (moment().subtract(Math.floor(Math.random() * 6), 'minutes')),
  id: message.id || shortid.generate(),
  content: message.content,
  user: message.user,
});

export const transformFromAppSpot = messages => (
  messages.map(message => new Message({
    timestamp: message.updated,
    id: message.id.toString(),
    content: message.content,
    user: {
      name: message.author.name,
      profilePic: `http://message-list.appspot.com${message.author.photoUrl}`,
    },
  })));
