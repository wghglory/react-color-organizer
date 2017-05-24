/**
 * React.Children.only(children) means Display component children can only have 1 child
 */
import React from 'react';
import PropTypes from 'prop-types';

// if true, display the only 1 child, (error if multiple children), else display nothing
const Display = ({ ifTruthy = true, children }) =>
  ifTruthy ?
    React.Children.only(children) :
    null;

Display.propTypes = {
  ifTruthy: PropTypes.bool,
  children: PropTypes.element.isRequired
};

export default Display;