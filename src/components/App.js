import React from 'react';

const H1 = ({ children }) => <h1>{children}</h1>;

class App extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <div>
        <H1>Hello World</H1>
      </div>
    );
  }
}

export default App;
