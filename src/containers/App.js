import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import Header from '../components/Header';
import Messages from '../components/Messages';
import { enhance } from './reducer';

const Spacer = styled.div`
  height: 50vh;
  background-color: transparent;
  margin-top: -50vh;
  z-index: 0;
`;

class App extends Component {
  componentDidUpdate() {
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

App.propTypes = {
  dispatchDeleteMessage: PropTypes.func.isRequired,
  dispatchRequestMessages: PropTypes.func.isRequired,
  messageData: PropTypes.shape({
    messages: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  }).isRequired,
};

export default enhance(App);
