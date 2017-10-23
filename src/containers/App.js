import React from 'react';
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
    };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    this.requestMessages();
  }

  requestMessages() {
    const url = `http://message-list.appspot.com/messages${this.token ? `?pageToken=${this.token}` : ''}`;
    fetch(url)
      .then(response => response.json())
      .then((response) => {
        const newMessages = transformFromAppSpot(response.messages);
        this.token = response.pageToken;
        this.setState({
          messages: [...this.state.messages, ...newMessages],
        });
      })
      .catch((e) => {
        alert('error!');
      });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Messages messages={this.state.messages} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
