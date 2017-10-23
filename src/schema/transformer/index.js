import shortid from 'shortid';
import moment from 'moment';
import Message from '../Message';

export const createMockMessage = message => new Message({
  timestamp: message.timestamp || (moment().subtract(Math.floor(Math.random() * 6), 'minutes')),
  id: message.id || shortid.generate(),
  content: message.content,
  user: message.user,
});

export default () => {};
