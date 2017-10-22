import React from 'react';
import styled from 'styled-components';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import { withProps } from 'recompose';
import Avatar from '../Avatar';
import MessageObject from '../../schema/Message';

export const Message = ({ content, id, timestamp, user, onSelect, onDelete }) => (
  <Grid fluid>
    <Row onClick={() => alert(id)}>
      <Col xs={3}><Avatar path={user.profilePic} /></Col>
      <Col xs={9}>
        <p>{user.name}</p>
        <p>{timestamp}</p>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>{content}</Col>
    </Row>
  </Grid>
);

const enhance = withProps(new MessageObject({
  user: {
    name: 'Name',
    profilePic: '/some/path',
  },
  timestamp: 'Since',
  id: 'id',
  content: 'hey yo!',
}));

const enhanced = enhance(Message);

export default enhanced;
