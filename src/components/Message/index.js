import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

const MessageWrapper = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding: 15px 17px 18px;

  &:first-child{
    margin-top: 9px;
  }

  &:last-child{
    border-bottom: none;
  }
`;

const P = styled.p`
  padding: 0;
  margin: 0;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: bold;
  padding: 0;
  margin: 0;
`;
const Subtitle = styled(P)`
  padding-top: 4px;
  font-size: 12px;
`;
const Content = styled(P)`
  font-size: 14px;
  line-height: 20px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 14px;
`;

const Header = styled.div`
  margin-left: 16px;
`;

export const Message = ({ message, onSelect, onDelete }) => (
  <MessageWrapper onClick={() => onSelect(message.id)}>
    <Row>
      <Avatar size={40} profilePic={message.user.profilePic} name={message.user.name} />
      <Header>
        <Title>{message.user.name}</Title>
        <Subtitle><Timestamp timestamp={message.timestamp} /></Subtitle>
      </Header>
    </Row>
    <Content>{message.content}</Content>
  </MessageWrapper>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Message;
