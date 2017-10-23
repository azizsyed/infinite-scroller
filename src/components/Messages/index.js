import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Message from '../Message';
import { HEADER_HEIGHT } from '../../constants/styles';

const MessageWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;

export const Messages = ({ messages, onDelete }) => (
  <MessageWrapper>
    {
      messages.map(message => (
        <Message
          key={message.id}
          onDelete={onDelete}
          message={message}
        />
      ))
    }
  </MessageWrapper>
);

Messages.propTypes = {
  onDelete: PropTypes.func.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profilePic: PropTypes.string.isRequired,
    }),
  })).isRequired,
};

export default Messages;
