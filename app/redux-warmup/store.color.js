// import { createStore } from 'redux';
const { createStore, combineReducers, compose, applyMiddleware } = require('redux');
const { colorsReducer } = require('./reducer.color');
const sortReducer = require('./reducer.sort');
const { addColor, removeColor, rateColor, sortColors } = require('./actions.color');

const initialState = {
  colors: [
    {
      id: 0,
      title: "Rad Red",
      color: "#FF0000",
      rating: 3,
      timestamp: "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)"
    },
    {
      id: 1,
      title: "Crazy Green",
      color: "#00FF00",
      rating: 0,
      timestamp: "Fri Mar 11 2016 12:00:00 GMT-0800 (PST)"
    },
    {
      id: 2,
      title: "Big Blue",
      color: "#0000FF",
      rating: 5,
      timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
    }
  ],
  sort: "SORTED_BY_TITLE"
};


// // demo1: createStore
// const store = createStore(colorsReducer);
// console.log(store.getState());  // []


// // demo2: combineReducers
// const store = createStore(
//   combineReducers({ colors: colorsReducer, sort: sortReducer })
// );
// console.log(store.getState());  //{ colors: [], sort: 'SORTED_BY_DATE' }


// // demo3: initialState
// const store = createStore(
//   combineReducers({ colors: colorsReducer, sort: sortReducer }), initialState
// );
// console.log(store.getState());  //{ colors: [...many stuff], sort: 'SORTED_BY_DATE' }


// // demo4: dispatching Actions
// const store = createStore(
//   combineReducers({ colors: colorsReducer, sort: sortReducer }), initialState
// );
// console.log("Length of color array before ADD_COLOR", store.getState().colors.length);
// store.dispatch({
//   type: "ADD_COLOR",
//   id: 3,
//   title: "Party Pink",
//   color: "#F142FF",
//   timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
// });
// console.log("Length of color array after ADD_COLOR", store.getState().colors.length);

// console.log("Color rating before RATE_COLOR", store.getState().colors[0].rating);
// store.dispatch({
//   type: "RATE_COLOR",
//   id: 0,
//   rating: 5
// });
// console.log("Color rating after RATE_COLOR", store.getState().colors[0].rating);


// // demo5: subscribe and unsubscribe: subscribe is triggered when store.dispatch invokes
// const store = createStore(
//   combineReducers({ colors: colorsReducer, sort: sortReducer }), initialState
// );
// const unsubscribeLogger = store.subscribe(() =>
//   console.log('next state', store.getState())
// );

// store.dispatch({
//   type: "ADD_COLOR",
//   id: 3,
//   title: "Party Pink",
//   color: "#F142FF",
//   timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
// });

// unsubscribeLogger();  // after unsubscribe, even if the following dispatch invokes, subscribe cb won't execute, but dispatch still execute.

// store.dispatch({
//   type: "ADD_COLOR",
//   id: 4,
//   title: "Big Blue",
//   color: "#0000FF",
//   timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
// });

// store.dispatch({
//   type: "RATE_COLOR",
//   id: 1,
//   rating: 5
// });

// store.dispatch({
//   type: "REMOVE_COLOR",
//   id: 2
// });


// // demo6: persistent data with html5 localStorage
// const store = createStore(
//   combineReducers({ colors: colorsReducer, sort: sortReducer }),
//   (localStorage['redux-store']) ?
//     JSON.parse(localStorage['redux-store']) :
//     {}
// );

// store.subscribe(() => {
//   localStorage['redux-store'] = JSON.stringify(store.getState());
// });

// let uniqueId = 0;

// store.dispatch({
//   type: "ADD_COLOR",
//   id: uniqueId++,
//   title: "Party Pink",
//   color: "#F142FF",
//   timestamp: new Date().toString()
// });


// // demo7: action creators
// const store = createStore(combineReducers({ colors: colorsReducer, sort: sortReducer }));
// store.dispatch(addColor("Party Pink", "#F142FF"));
// store.dispatch(addColor("lawn", "#009900"));
// store.dispatch(addColor("Tomato", "#990000"));
// store.dispatch(addColor("Big Blue", "#0000FF"));
// console.log(store.getState().colors.map(c => c.title).join(", "));


// // demo8: compose, a HOC, takes functions as parameter and returns a function. 
// // When invoking the returned function, pass the parameter based on the last/rightmost function passed into compose
// const store = createStore(combineReducers({ colors: colorsReducer, sort: sortReducer }));
// // rightmost party pink is first executed method
// const populate = compose(
//   () => store.dispatch(addColor("Big Blue", "#0000FF")),
//   () => store.dispatch(addColor("Tomato", "#990000")),
//   () => store.dispatch(addColor("lawn", "#009900")),
//   () => store.dispatch(addColor("Party Pink", "#F142FF"))
// );

// // execution order: right to left, state, color, map...
// const print = compose(
//   list => console.log(list),
//   titles => titles.join(", "),
//   colors => colors.map(c => c.title),
//   state => state.colors
// );

// populate();
// print(store.getState());


// demo9: applyMiddleware() takes more than 1 paramters
const logger = store => next => action => {
  let result;
  // console.groupCollapsed("dispatching", action.type);
  console.log('prev state', store.getState());
  console.log('action', action);
  result = next(action);
  console.log('next state', store.getState());
  // console.groupEnd();
  return result;
};

const saver = store => next => action => {
  let result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

const store = applyMiddleware(logger, saver)(createStore)(
  combineReducers({ colors: colorsReducer, sort: sortReducer }),
  (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    {}
);

const populate = compose(
  () => console.log('color count', store.getState().colors.length),
  () => store.dispatch(addColor("Big Blue", "#0000FF")),
  () => store.dispatch(addColor("Tomato", "#990000")),
  () => store.dispatch(addColor("lawn", "#009900")),
  () => store.dispatch(addColor("Party Pink", "#F142FF"))
);

populate();