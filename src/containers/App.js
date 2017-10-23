import React from 'react';
import Waypoint from 'react-waypoint';
import { createMockMessage, transformFromAppSpot } from '../schema/transformer';

import Header from '../components/Header';
import Messages from '../components/Messages';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
      ],
      loaded: false,
      isFetching: true,
      error: false,
    };
  }

  componentDidMount() {
    this.requestMessages();

    window.addEventListener('scroll', (e) => {
      console.log((window.innerHeight + window.scrollY) - this.$el.offsetHeight);
      if (this.state.isFetching) {
        return;
      }
      if (this.$el.offsetHeight - (window.innerHeight + window.scrollY) < 400) {
        this.requestMessages();
      }
    });
  }

  requestMessages() {
    const url = `http://message-list.appspot.com/messages?limit=15${this.token ? `&pageToken=${this.token}` : ''}`;

    this.setState({
      isFetching: true,
    });

    fetch(url)
      .then(response => response.json())
      .then((response) => {
        const newMessages = transformFromAppSpot(response.messages);
        this.token = response.pageToken;
        this.setState({
          messages: [...this.state.messages, ...newMessages],
          loaded: true,
          isFetching: false,
        });
      })
      .catch(() => {
        alert('error!');
      });
  }

  deleteMessage(messageId) {
    const { messages } = this.state;
    const matchedMessage = messages.find(message => message.id === messageId);
    const matchedIndex = messages.indexOf(matchedMessage);

    if (matchedIndex !== -1) {
      const newMessages = messages.slice();
      newMessages.splice(matchedIndex, 1);

      this.setState({
        messages: newMessages,
      });
    }
  }

  render() {
    return (
      <div ref={(el) => { this.$el = el; }}>
        <Header />
        <Messages messages={this.state.messages} onDelete={messageId => this.deleteMessage(messageId)} />
      </div>
    );
  }
}

export default App;
