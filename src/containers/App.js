import React from 'react';
import Waypoint from 'react-waypoint';
import { createMockMessage, transformFromAppSpot } from '../schema/transformer';

import Header from '../components/Header';
import Messages from '../components/Messages';

import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      isFetching: false,
      error: false,
    };
  }

  componentDidMount() {
    this.requestMessages();

    const scrolling = Observable
      .fromEvent(window, 'scroll')
      .map(evt => (
        this.$el.offsetHeight - (evt.currentTarget.innerHeight + evt.currentTarget.scrollY)
      ))
      .debounce(() => Observable.timer(10))
      .filter(diff => diff < 200);

    scrolling.subscribe(() => this.requestMessages());
  }

  requestMessages() {
    if (this.state.isFetching) {
      return;
    }
    const url = `http://message-list.appspot.com/messages?limit=5${this.token ? `&pageToken=${this.token}` : ''}`;

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
          isFetching: false,
        });
      })
      .catch(() => {
        this.setState({
          isFetching: false,
          error: 'there was an error fetching messages...',
        });
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
