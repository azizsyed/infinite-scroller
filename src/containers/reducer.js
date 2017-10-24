import { compose, withReducer, withHandlers } from 'recompose';
import { createAction } from 'redux-actions';
import fetchMessagesService from '../services';

export const requestMessages = createAction('REQUEST_MESSAGES');
export const isFetchingMessages = createAction('IS_FETCHING_MESSAGES');
export const addMessages = createAction('ADD_MESSAGES');
export const errorMessages = createAction('ERROR_MESSAGES');


// STATE
const defaultState = {
  authors: {
  },
  messages: [
  ],
  error: false,
  isFetching: false,
};

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case 'IS_FETCHING_MESSAGES':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'ADD_MESSAGES':
      return {
        ...state,
        messages: state.messages.concat(action.payload),
        isFetching: false,
      };
    case 'ERROR_MESSAGES':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const COUNT = 10;

export const enhance =
  compose(
    withReducer('messageData', 'dispatch', reducer, defaultState),
    withHandlers({
      dispatchRequestMessages: props => () => {
        const { dispatch } = props;

        if (props.messageData.isFetching) {
          return;
        }

        dispatch(isFetchingMessages());

        fetchMessagesService(COUNT)
          .then((messages) => {
            dispatch(addMessages(messages));
          })
          .catch(() => {
            dispatch(errorMessages('there was an error fetching messages...'));
          });
      },
      dispatchDeleteMessage: props => (messageId) => {
        alert('delete');
        // const { messages } = this.state;
        // const matchedMessage = messages.find(message => message.id === messageId);
        // const matchedIndex = messages.indexOf(matchedMessage);

        // if (matchedIndex !== -1) {
        //   const newMessages = messages.slice();
        //   newMessages.splice(matchedIndex, 1);

        //   this.setState({
        //     messages: newMessages,
        //   });
        // }
      },
    }),
  );
