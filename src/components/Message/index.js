import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import Avatar from '../Avatar';

export const Message = ({ message, onSelect, onDelete }) => (
  <Grid fluid>
    <Row onClick={() => onSelect(message.id)}>
      <Col xs={3}><Avatar path={message.user.profilePic} /></Col>
      <Col xs={9}>
        <p>{message.user.name}</p>
        <p>{message.timestamp}</p>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        {message.content}
        <button onClick={() => onDelete(message.id)}>delete</button>
      </Col>
    </Row>
  </Grid>
);

Message.propTypes = {
  message: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Message;
