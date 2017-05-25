import React from 'react';
import ReactDOM from 'react-dom';

// bootstrap core. specific plugin like jumbotron is imported in needed component.
// import './bootstrap/_core.scss';

// import App from './components/App';

// ReactDOM.render(
//     <App />,
//     document.getElementById('app')
// );


/* Clock component: componentDidMount, componentWillUnmount, unmountComponentAtNode */
// import Clock from './components/Clock';
// const target = document.getElementById('app');

// ReactDOM.render(
//     <Clock onClose={() => ReactDOM.unmountComponentAtNode(target)} />,
//     target
// );

/* HiddenMessages component: componentWillReceiveProps */
// import HiddenMessages from './components/HiddenMessages';
// ReactDOM.render(
//     <HiddenMessages />,
//     document.getElementById('app')
// );

/* HiddenMessage2 component: HOC */
// import Message from './components/HiddenMessage2';
// ReactDOM.render(
//     <Message />,
//     document.getElementById('app')
// );

/* Display component: React.Children.only(children) */
// import Display from './components/Display';
// const age = 22;
// ReactDOM.render(
//     <Display ifTruthy={age >= 21}>
//         <h1>You can enter</h1>
//     </Display>,
//     document.getElementById('app')
// );

/* Display2 component: React.Children.toArray(children) */
// import { Display2, WhenTruthy, WhenFalsy } from './components/Display2';
// const age = 20;
// ReactDOM.render(
//     <Display2 ifTruthy={age >= 21}>
//         <WhenTruthy>
//             <h1>You can Enter</h1>
//         </WhenTruthy>
//         <WhenFalsy>
//             <h1>Beat it Kid</h1>
//         </WhenFalsy>
//     </Display2>,
//     document.getElementById('app')
// );

/* CountryList: fetch api with componentWillMount or componentDidMount, HOC */
// import CountryList from './components/CountryList';
// ReactDOM.render(
//     <CountryList selected="Cuba" />,
//     document.getElementById('app')
// );

/* Timeline: d3 library */
// // import App from './components/Timeline';
// import Timeline from './components/Timeline2';
// ReactDOM.render(
//     // <App />,
//     <Timeline name="History of Skiing" />,
//     document.getElementById('app')
// );

/* Flux count down */
import Countdown from './flux/CountdownComponent';
import CountdownDispatcher from './flux/dispatcher.countdown';
import countdownActions from './flux/action.countdown';
import CountdownStore from './flux/store.countdown';

const appDispatcher = new CountdownDispatcher();
const actions = countdownActions(appDispatcher);
const store = new CountdownStore(10, appDispatcher);

const render = count => ReactDOM.render(
  <Countdown count={count} {...actions} />,
  document.getElementById('app')
);

store.on("TICK", () => render(store.count));
store.on("RESET", () => render(store.count));
render(store.count);