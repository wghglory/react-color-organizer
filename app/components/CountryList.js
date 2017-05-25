/**
 * Making Requests with Fetch (npm install isomorphic-fetch --save)
 */
import React from 'react';
import DataComponent from './hocs/DataComponent';
import PropTypes from 'prop-types';

/* Use HOC */
// const Countries = ({ data }) =>
//   (
//     <ol className="people-list">
//       {data.map((c, i) => {
//         return <li key={i}>{c.name}</li>;
//       })}
//     </ol>
//   );

const Countries = ({ data, selected = "China" }) =>
  (
    <select className="people-list" defaultValue={selected}>
      {data.map(({ name }, i) =>
        <option key={i} value={name}>{name}</option>
      )}
    </select>
  );

Countries.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.string
};

const CountryList = DataComponent(
  Countries,
  "https://restcountries.eu/rest/v1/all"
);

export default CountryList;

/*
// not using hoc:
export default class CountryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      countryNames: [],
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    fetch('https://restcountries.eu/rest/v1/all')
      .then(response => response.json())
      .then(json => json.map(country => country.name))
      .then(countryNames => this.setState({ countryNames, loading: false }));
  }

  render() {
    const { countryNames, loading } = this.state;
    return (loading) ?
      <div>Loading Country Names...</div> :
      (!countryNames.length) ?
        <div>No country Names</div> :
        <ul>
          {countryNames.map((x, i) => <li key={i}>{x}</li>)}
        </ul>;
  }
}*/
