import React from 'react';
import Message from '../Message';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants/styles';

const MessageWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;

export const Messages = ({ messages }) => (
  <MessageWrapper>
    <h2>===== MESSAGES START =====</h2>
    {
      messages.map(message => <Message key={message.id} onSelect={(e) => {
        e.preventDefault;
        console.log('select: ', e);
        return false;
      }} onDelete={(e) => {
        e.preventDefault;
        console.log('delete: ', e);
        return false;
      }} message={message} />)
    }
    <h2>===== MESSAGES END =====</h2>
  </MessageWrapper>
);

export default Messages;
