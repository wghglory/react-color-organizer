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

/* // test
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
*/

module.exports = { colorsReducer, colorReducer };