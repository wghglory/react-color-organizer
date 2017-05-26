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
