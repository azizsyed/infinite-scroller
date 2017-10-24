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
    if (this.props.isActive) {
      this.startTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isActive !== this.props.isActive) {
      if (nextProps.isActive) {
        this.startTimer();
      } else {
        this.endTimer();
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.formatter !== nextState.formatter) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    this.endTimer();
  }

  startTimer() {
    this.timer = setInterval(() => this.updateSince(), 1000 * 30);
  }

  endTimer() {
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

    return (
      <span>{formatter}</span>
    );
  }
}

Timestamp.propTypes = {
  isActive: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default Timestamp;
