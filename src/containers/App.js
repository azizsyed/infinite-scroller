import React from 'react';
import { ThemeProvider } from 'styled-components';
import MessageObject from '../schema/Message';

import Header from '../components/Header';
import Messages from '../components/Messages';

const theme = {
  flexboxgrid: {
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
        new MessageObject({
          user: {
            name: 'Name',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id1',
          content: 'hey yo!',
        }),
        new MessageObject({
          user: {
            name: 'Name2',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id2',
          content: 'hey yo 2!',
        }),
        new MessageObject({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id3',
          content: 'hey yo 3!',
        }),
        new MessageObject({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id3',
          content: 'hey yo 3!',
        }),
        new MessageObject({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id3',
          content: 'hey yo 3!',
        }),
        new MessageObject({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id3',
          content: 'hey yo 3!',
        }),
        new MessageObject({
          user: {
            name: 'Name3',
            profilePic: '/some/path',
          },
          timestamp: 'Since',
          id: 'id3',
          content: 'hey yo 3!',
        }),
      ],
    };
  }

  shouldComponentUpdate() {
    return true;
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
