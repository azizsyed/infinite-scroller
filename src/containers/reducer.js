import { compose, withReducer, withHandlers } from 'recompose';
import { createAction } from 'redux-actions';
import fetchMessagesService from '../services';

export const ADD_MESSAGES = 'ADD_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';
export const ERROR_MESSAGES = 'ERROR_MESSAGES';
export const REQUEST_MESSAGES = 'REQUEST_MESSAGES';
export const IS_FETCHING_MESSAGES = 'IS_FETCHING_MESSAGES';

export const addMessages = createAction(ADD_MESSAGES);
export const deleteMessage = createAction(DELETE_MESSAGE);
export const errorMessages = createAction(ERROR_MESSAGES);
export const requestMessages = createAction(REQUEST_MESSAGES);
export const isFetchingMessages = createAction(IS_FETCHING_MESSAGES);

// STATE
const defaultState = {
  authors: {
  },
  messages: [
  ],
  error: false,
  isFetching: false,
  apiToken: null,
};

// REDUCER
const reducer = (state, action) => {
  switch (action.type) {
    case IS_FETCHING_MESSAGES:
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case ADD_MESSAGES:
      return {
        ...state,
        messages: state.messages.concat(action.payload.messages),
        apiToken: action.payload.apiToken,
        isFetching: false,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages.slice(0, action.payload),
          ...state.messages.slice(action.payload + 1),
        ],
      };
    case ERROR_MESSAGES:
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
        const { dispatch, messageData } = props;

        if (messageData.isFetching) {
          return;
        }

        dispatch(isFetchingMessages());

        fetchMessagesService(COUNT, messageData.apiToken)
          .then(response => dispatch(addMessages(response)))
          .catch(() => dispatch(errorMessages('Unable to fetch messages...')));
      },
      dispatchDeleteMessage: props => (message) => {
        const { dispatch, messageData } = props;
        const matchedIndex = messageData.messages.indexOf(message);
        dispatch(deleteMessage(matchedIndex));
      },
    }),
  );
