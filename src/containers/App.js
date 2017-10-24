import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Waypoint from 'react-waypoint';
import Error from '../components/Error';
import Header from '../components/Header';
import Messages from '../components/Messages';
import Loader from '../components/Loader';
import Spacer from '../components/Spacer';
import { enhance } from './reducer';

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

    return (
      <div ref={(el) => { this.$el = el; }}>
        <Header />
        <Messages
          messages={messages}
          onDelete={messageId => this.deleteMessage(messageId)}
        />
        { isFetching && <Loader /> }
        { error && <Error>{error}</Error>}
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
