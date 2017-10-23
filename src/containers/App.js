import React from 'react';
// import WaypointNew from 'waypoints';
import Waypoint from 'react-waypoint';
import { ThemeProvider } from 'styled-components';
import { createMockMessage, transformFromAppSpot } from '../schema/transformer';

import Header from '../components/Header';
import Messages from '../components/Messages';

const theme = {
  flexboxgrid: {
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
    // breakpoints: {
    //   xs: 0,  // em
    //   sm: 48, // em
    //   md: 64, // em
    //   lg: 75, // em
    // },
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
      ],
      loaded: false,
      error: false,
    };
  }

  componentDidMount() {
    this.requestMessages();
  }

  requestMessages() {
    const url = `http://message-list.appspot.com/messages?limit=5${this.token ? `&pageToken=${this.token}` : ''}`;
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        const newMessages = transformFromAppSpot(response.messages);
        this.token = response.pageToken;
        this.setState({
          messages: [...this.state.messages, ...newMessages],
          loaded: true,
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
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Messages messages={this.state.messages} onDelete={messageId => this.deleteMessage(messageId)} />
          {this.state.loaded && (
            <Waypoint
              scrollableAncestor={window}
              onEnter={() => this.requestMessages()}
            >
              <div style={{ marginBottom: '50vh' }}>&nbsp;</div>
            </Waypoint>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
