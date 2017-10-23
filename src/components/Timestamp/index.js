import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Timestamp extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      formatter: null,
    };
  }

  componentWillMount() {
    this.calculate(this.props.timestamp);
  }

  componentDidMount() {
    this.timer = setInterval(() => this.updateSince(), 200);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.formatter !== nextState.formatter) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  calculate() {
    this.setState({
      formatter: moment(this.props.timestamp).startOf('second').fromNow(),
    });
  }

  updateSince() {
    this.calculate();
  }

  render() {
    const { formatter } = this.state;

    // const formatted = props.timestamp.format('dddd, MMMM Do YYYY, h:mm:ss a');

    return (
      <span>{formatter}</span>
    );
  }
}

Timestamp.propTypes = {
  timestamp: PropTypes.string.isRequired,
};

export default Timestamp;
