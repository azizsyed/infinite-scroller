import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import Avatar from '../Avatar';
import Timestamp from '../Timestamp';

const MessageWrapper = styled(Grid)`
  border-bottom: 1px solid #e5e5e5;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: bold;
`;
const Subtitle = styled.p`
  font-size: 12px;
`;
const Content = styled.p`
  font-size: 14px;
`;

export const Message = ({ message, onSelect, onDelete }) => (
  <MessageWrapper fluid onClick={() => onSelect(message.id)}>
    <Row>
      <Col xs={3}><Avatar size={40} profilePic={message.user.profilePic} name={message.user.name} /></Col>
      <Col xs={9}>
        <Title>{message.user.name}</Title>
        <Subtitle><Timestamp timestamp={message.timestamp} /></Subtitle>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <Content>{message.content}</Content>
        <button onClick={() => onDelete(message.id)}>delete</button>
      </Col>
    </Row>
  </MessageWrapper>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Message;
