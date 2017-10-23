import React from 'react';
import Message from '../Message';
import styled from 'styled-components';
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

export default Messages;
