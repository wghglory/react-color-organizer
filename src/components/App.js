// use react state
import React from 'react';
import { v4 } from 'uuid';
import AddColorForm from './AddColorForm';
import ColorList from './ColorList';
import SortMenu from './SortMenu';
import '../scss/App.scss';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [
                {
                    "id": "8658c1d0-9eda-4a90-95e1-8001e8eb6036",
                    "title": "Ocean Blue",
                    "color": "#0070ff",
                    "rating": 3,
                    "timestamp": "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)"
                },
                {
                    "id": "f9005b4e-975e-433d-a646-79df172e1dbb",
                    "title": "Tomato",
                    "color": "#d10012",
                    "rating": 2,
                    "timestamp": "Fri Mar 11 2016 12:00:00 GMT-0800 (PST)"
                },
                {
                    "id": "58d9caee-6ea6-4d7b-9984-65b145031979",
                    "title": "Lawn",
                    "color": "#67bf4f",
                    "rating": 1,
                    "timestamp": "Thu Mar 10 2016 01:11:12 GMT-0800 (PST)"
                },
                {
                    "id": "a5685c39-6bdc-4727-9188-6c9a00bf7f95",
                    "title": "Party Pink",
                    "color": "#ff00f7",
                    "rating": 5,
                    "timestamp": "Wed Mar 9 2016 03:26:00 GMT-0800 (PST)"
                }
            ],
            sort: "SORTED_BY_DATE"
        };
        this.addColor = this.addColor.bind(this);
        this.rateColor = this.rateColor.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.sortColors = this.sortColors.bind(this);
    }

    addColor(title, color) {
        const colors = [
            ...this.state.colors,
            {
                id: v4(),
                title,
                color,
                rating: 0,
                timestamp: new Date().toString()
            }
        ];
        this.setState({ colors });
    }

    rateColor(id, rating) {
        const colors = this.state.colors.map(color =>
            (color.id !== id) ?
                color :
                {
                    ...color,
                    rating
                }
        );
        this.setState({ colors });
    }

    removeColor(id) {
        const colors = this.state.colors.filter(color => color.id !== id);
        this.setState({ colors });
    }

    sortColors(value) {
        this.setState({ sort: value });
    }

    render() {
        const { addColor, rateColor, removeColor, sortColors } = this;
        return (
            <div className="app">
                <SortMenu {...this.state} sortColors={sortColors} />
                <AddColorForm onNewColor={addColor} />
                <ColorList {...this.state}
                    onRate={rateColor}
                    onRemove={removeColor} />
            </div>
        );
    }

}