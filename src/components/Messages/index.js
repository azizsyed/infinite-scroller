import React from 'react';
import Message from '../Message';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../constants/styles';

const MessageWrapper = styled.div`
  padding-top: ${HEADER_HEIGHT};
`;

export const Messages = ({ messages }) => (
  <MessageWrapper>
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
  </MessageWrapper>
);

export default Messages;
