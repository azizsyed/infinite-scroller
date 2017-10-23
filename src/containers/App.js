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
      messages: [
      ],
      loaded: false,
      isFetching: true,
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
      .throttle(() => Observable.timer(500))
      .filter(diff => diff < 400);

    scrolling.subscribe(() => this.requestMessages());
  }

  requestMessages() {
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
