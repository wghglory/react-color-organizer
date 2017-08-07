/**
 * componentDidMount, componentWillUnmount to start/end background timer task
 */
import React from 'react';
import PropTypes from 'prop-types';
import '../scss/Clock.scss';
import { getClockTime } from '../utils/time';

const AlarmClockDisplay = ({ hours, minutes, seconds, ampm, onClose }) =>
  (
    <div className="clock">
      <span>{hours}</span>
      <span>:</span>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
      <span>{ampm}</span>
      <button onClick={onClose}>x</button>
    </div>
  );

AlarmClockDisplay.propTypes = {
  hours: PropTypes.any.isRequired,
  minutes: PropTypes.any.isRequired,
  seconds: PropTypes.any.isRequired,
  ampm: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default class Clock extends React.Component {

  constructor() {
    super();
    this.state = getClockTime();
  }

  componentDidMount() {
    console.log("Starting Clock");
    this.ticking = setInterval(() =>
      this.setState(getClockTime())
      , 1000);
  }

  componentWillUnmount() {
    clearInterval(this.ticking);
    console.log("Stopping Clock");
  }

  render() {
    return (
      <AlarmClockDisplay {...this.state} onClose={this.props.onClose} />
    );
  }

}

Clock.propTypes = {
  onClose: PropTypes.func
};