/**
 * React.Children.toArray(children) converts childrenElement to array
 *
 * The Display component will display a single child when a condition is true or another when the condition is false. 
 * WhenTruthy and WhenFalsy components and use them as children in the Display component. 
 * The findChild function uses React.Children to convert the children into an array. 
 * We can filter that array to locate and return an individual child by component type
 */
import React from 'react';
import PropTypes from 'prop-types';

const findChild = (children, child) =>
  React.Children.toArray(children)
    .filter(c => c.type === child)[0];

export const WhenTruthy = ({ children }) =>
  React.Children.only(children);

export const WhenFalsy = ({ children }) =>
  React.Children.only(children);

export const Display2 = ({ ifTruthy = true, children }) =>
  (ifTruthy) ?
    findChild(children, WhenTruthy) :
    findChild(children, WhenFalsy);

Display2.propTypes = {
  ifTruthy: PropTypes.bool,
  children: PropTypes.array.isRequired
};