import React from 'react';
import { ThemeProvider } from 'styled-components';
import { createMockMessage } from '../schema/transformer';

import Header from '../components/Header';
import Messages from '../components/Messages';

import request from 'request';

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
        createMockMessage({
          user: {
            name: 'Name',
            profilePic: '/some/path',
          },
          content: 'hey yo!',
        }),
        createMockMessage({
          user: {
            name: 'Name2',
            profilePic: '/some/path',
          },
          content: 'hey yo 2!',
        }),
        createMockMessage({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          content: 'hey yo 3!',
        }),
        createMockMessage({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          content: 'hey yo 3!',
        }),
        createMockMessage({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          content: 'hey yo 3!',
        }),
        createMockMessage({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          content: 'hey yo 3!',
        }),
        createMockMessage({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          content: 'hey yo 3!',
        }),
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
