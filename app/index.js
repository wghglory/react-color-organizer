import React from 'react';
import ReactDOM from 'react-dom';

// bootstrap core. specific plugin like jumbotron is imported in needed component.
// import './bootstrap/_core.scss';

// import App from './components/App';

// ReactDOM.render(
//     <App />,
//     document.getElementById('app')
// );


/* Clock demo -- componentDidMount, componentWillUnmount, unmountComponentAtNode */
// import Clock from './components/Clock';
// const target = document.getElementById('app');

// ReactDOM.render(
//     <Clock onClose={() => ReactDOM.unmountComponentAtNode(target)} />,
//     target
// );

/* Hidden Message demo -- componentWillReceiveProps */
import HiddenMessages from './components/HiddenMessages';
ReactDOM.render(
    <HiddenMessages />,
    document.getElementById('app')
);