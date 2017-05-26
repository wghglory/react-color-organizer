# Redux 

## Reducer

```javascript
// reducer.color.js
const colorReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_COLOR":
      return {
        id: action.id,
        title: action.title,
        color: action.color,
        timestamp: action.timestamp,
        rating: 0
      };
    case "RATE_COLOR":
      return (state.id !== action.id) ?
        state :
        Object.assign({}, state, { rating: action.rating });
    // {
    //   ...state,
    //   rating: action.rating
    // };
    default:
      return state;
  }
};

const colorsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_COLOR":
      return [
        ...state,
        colorReducer({}, action)
      ];
    case "RATE_COLOR":
      return state.map(
        c => colorReducer(c, action)
      );
    case "REMOVE_COLOR":
      return state.filter(
        c => c.id !== action.id
      );
    default:
      return state;
  }
};

// test
let currentColors = [
  {
    id: 1,
    title: "Berry Blue",
    color: "#000066",
    rating: 0,
    timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
  }
];
console.log(currentColors);

// add action
let action = {
  type: "ADD_COLOR",
  id: 2,
  title: "Party Pink",
  color: "#F142FF",
  timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
};
let newColors = colorsReducer(currentColors, action);
console.log(newColors);

// rate action
action = {
  type: "RATE_COLOR",
  id: 1,
  rating: 5
};
newColors = colorsReducer(newColors, action);
console.log(newColors);

// remove action
action = {
  type: "REMOVE_COLOR",
  id: 2
};
newColors = colorsReducer(newColors, action);
console.log(newColors);

module.exports = { colorsReducer, colorReducer };
```

## Action

```javascript
// actions.color.js
const v4 = require('uuid');
const addColor = (title, color) =>
  ({
    type: "ADD_COLOR",
    id: v4(),
    title,
    color,
    timestamp: new Date().toString()
  });

const removeColor = id =>
  ({
    type: "REMOVE_COLOR",
    id
  });

const rateColor = (id, rating) =>
  ({
    type: "RATE_COLOR",
    id,
    rating
  });

const sortColors = sortedBy => {
  if (sortedBy === "rating") {
    return {
      type: "SORT_COLORS",
      sortBy: "SORTED_BY_RATING"
    };
  }
  else if (sortedBy === "title") {
    return {
      type: "SORT_COLORS",
      sortBy: "SORTED_BY_TITLE"
    };
  }
  else return {
    type: "SORT_COLORS",
    sortBy: "SORTED_BY_DATE"
  };
};

module.exports = { addColor, removeColor, rateColor, sortColors };
```

## Store

#### demo1: createStore

```javascript
const { createStore } = require('redux');
const { colorsReducer } = require('./reducer.color');

const store = createStore(colorsReducer);
console.log(store.getState());  // []
```

#### demo2: combineReducers

```javascript
const { createStore } = require('redux');
const { colorsReducer } = require('./reducer.color');

const store = createStore(combineReducers({ colors: colorsReducer, sort: sortReducer }));
console.log(store.getState());  // { colors: [], sort: 'SORTED_BY_DATE' }
```

#### demo3: initialState

```javascript
const store = createStore(
  combineReducers({ colors: colorsReducer, sort: sortReducer }), initialState
);
console.log(store.getState());  //{ colors: [...many stuff], sort: 'SORTED_BY_DATE' }
```

#### demo4: dispatching Actions

```javascript
const store = createStore(
  combineReducers({ colors: colorsReducer, sort: sortReducer }), initialState
);

console.log("Length of color array before ADD_COLOR", store.getState().colors.length);
store.dispatch({
  type: "ADD_COLOR",
  id: 3,
  title: "Party Pink",
  color: "#F142FF",
  timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
});
console.log("Length of color array after ADD_COLOR", store.getState().colors.length);

console.log("Color rating before RATE_COLOR", store.getState().colors[0].rating);
store.dispatch({
  type: "RATE_COLOR",
  id: 0,
  rating: 5
});
console.log("Color rating after RATE_COLOR", store.getState().colors[0].rating);
```

#### demo5: subscribe and unsubscribe: subscribe is triggered when store.dispatch invokes

```javascript
const store = createStore(
  combineReducers({ colors: colorsReducer, sort: sortReducer }), initialState
);

const unsubscribeLogger = store.subscribe(() =>
  console.log('next state', store.getState())
);

store.dispatch({
  type: "ADD_COLOR",
  id: 3,
  title: "Party Pink",
  color: "#F142FF",
  timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
});

unsubscribeLogger();  // after unsubscribe, even if the following dispatch invokes, subscribe cb 't execute, but dispatch still execute.

store.dispatch({
  type: "ADD_COLOR",
  id: 4,
  title: "Big Blue",
  color: "#0000FF",
  timestamp: "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
});
store.dispatch({
  type: "RATE_COLOR",
  id: 1,
  rating: 5
});
store.dispatch({
  type: "REMOVE_COLOR",
  id: 2
});
```

#### demo6: persistent data with html5 localStorage

```javascript
const store = createStore(
  combineReducers({ colors: colorsReducer, sort: sortReducer }),
  (localStorage['redux-store']) ?
    JSON.parse(localStorage['redux-store']) :
    {}
);

store.subscribe(() => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
});

let uniqueId = 0;

store.dispatch({
  type: "ADD_COLOR",
  id: uniqueId++,
  title: "Party Pink",
  color: "#F142FF",
  timestamp: new Date().toString()
});
```

#### demo7: action creators

```javascript
const store = createStore(combineReducers({ colors: colorsReducer, sort: sortReducer }));
store.dispatch(addColor("Party Pink", "#F142FF"));
store.dispatch(addColor("lawn", "#009900"));
store.dispatch(addColor("Tomato", "#990000"));
store.dispatch(addColor("Big Blue", "#0000FF"));
console.log(store.getState().colors.map(c => c.title).join(", "));
```

#### demo8: compose, a HOC, takes functions as parameter and returns a function. 

compose: When invoking the returned function, pass the parameter based on the last/rightmost function passed into compose

```javascript
const store = createStore(combineReducers({ colors: colorsReducer, sort: sortReducer }));

// rightmost party pink is first executed method
const populate = compose(
  () => store.dispatch(addColor("Big Blue", "#0000FF")),
  () => store.dispatch(addColor("Tomato", "#990000")),
  () => store.dispatch(addColor("lawn", "#009900")),
  () => store.dispatch(addColor("Party Pink", "#F142FF"))
);

// execution order: right to left, state, color, map...
const print = compose(
  list => console.log(list),
  titles => titles.join(", "),
  colors => colors.map(c => c.title),
  state => state.colors
);
populate();
print(store.getState());
```

#### demo9: applyMiddleware() takes more than 1 paramters

```javascript
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
```