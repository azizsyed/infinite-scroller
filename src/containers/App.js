import React from 'react';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import Header from '../components/Header';
import Messages from '../components/Messages';
import fetchMessagesService from '../services';

import { withReducer } from 'recompose';
import { enhance } from './reducer';

const COUNT = 10;

const Spacer = styled.div`
  height: 50vh;
  background-color: transparent;
  margin-top: -50vh;
  z-index: 0;
`;

class App extends React.Component {
  componentDidMount() {
    this.requestMessages();
  }

  componentDidUpdate() {
    if (!this.props.messageData.messages.length) {
      return;
    }
    if (window.innerHeight > document.body.clientHeight) {
      this.requestMessages();
    }
  }

  requestMessages() {
    this.props.dispatchRequestMessages();
  }

  deleteMessage(messageId) {
    this.props.dispatchDeleteMessage(messageId);
  }

  render() {
    const { messageData } = this.props;
    const { error, isFetching, messages } = messageData;

    console.log('rendering!');

    let output = null;
    if (error) {
      output = <h2>Error :(</h2>;
    } else {
      output = (
        <Messages
          messages={messages}
          onDelete={messageId => this.deleteMessage(messageId)}
        />
      );
    }

    return (
      <div ref={(el) => { this.$el = el; }}>
        <Header />
        { output }
        { isFetching && <h2>Loading...(you should not see this!)</h2> }
        <Waypoint onEnter={() => this.requestMessages()}>
          <Spacer />
        </Waypoint>
      </div>
    );
  }
}

export default enhance(App);
