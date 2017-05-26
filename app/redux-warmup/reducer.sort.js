const sortReducer = (state = "SORTED_BY_DATE", action) => {
  switch (action.type) {
    case "SORT_COLORS":
      return action.sortBy;
    default:
      return state;
  }
};

/* // test
let state = "SORTED_BY_DATE";
let action = {
  type: "SORT_COLORS",
  sortBy: "SORTED_BY_TITLE"
};
let nextState = sortReducer(state, action);
console.log(nextState);

action = {
  type: "SORT_COLORS",
  sortBy: "SORTED_BY_RATING"
};
nextState = sortReducer(nextState, action);
console.log(nextState);

action = {
  type: "SORT_COLORS",
  sortBy: "SORTED_BY_DATE"
};
nextState = sortReducer(nextState, action);
console.log(nextState);*/

module.exports = sortReducer;