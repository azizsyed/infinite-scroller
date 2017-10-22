import React from 'react';
import { ThemeProvider } from 'styled-components';

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
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Header />
          <Messages />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
