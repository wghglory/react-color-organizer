import React from 'react';
import PropTypes from 'prop-types';
import Color from './Color';
import '../scss/ColorList.scss';
import { sortBy } from '../utils/arrayHelper';

const sortFunction = sort =>
    (sort === "SORTED_BY_TITLE") ?
        sortBy("string", "title") :
        (sort === "SORTED_BY_RATING") ?
            sortBy("number", "rating") :
            sortBy("date", "timestamp");

const ColorList = ({ colors = [], sort, onRate = f => f, onRemove = f => f }) => {
    const sortedColors = [...colors].sort(sortFunction(sort));
    return (
        <div className="color-list">
            {(sortedColors.length === 0) ?
                <p>No Colors Listed. (Add a Color)</p> :
                sortedColors.map(color =>
                    <Color key={color.id}
                        {...color}
                        onRate={(rating) => onRate(color.id, rating)}
                        onRemove={() => onRemove(color.id)} />
                )
            }
        </div>
    );
};


ColorList.propTypes = {
    colors: PropTypes.array,
    onRate: PropTypes.func,
    onRemove: PropTypes.func,
    sort: PropTypes.string.isRequired
};

export default ColorList;