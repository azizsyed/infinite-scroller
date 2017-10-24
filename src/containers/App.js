import React from 'react';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import Header from '../components/Header';
import Messages from '../components/Messages';
import REQUEST from '../services';

const COUNT = 10;

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
      .filter(diff => diff < 400);

    scrolling.subscribe(() => this.requestMessages());
  }

  requestMessages() {
    if (this.state.isFetching) {
      return;
    }

    this.setState({
      isFetching: true,
    });

    REQUEST(COUNT)
      .then((messages) => {
        this.setState({
          messages: [...this.state.messages, ...messages],
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
    const { error } = this.state;
    let output = null;
    if (error) {
      output = <h1>Error :(</h1>;
    } else {
      output = (
        <Messages
          messages={this.state.messages}
          onDelete={messageId => this.deleteMessage(messageId)}
        />
      );
    }

    return (
      <div ref={(el) => { this.$el = el; }}>
        <Header />
        { output }
      </div>
    );
  }
}

export default App;
