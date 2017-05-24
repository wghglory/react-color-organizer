/**
 * npm install d3 --save
 */
import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

const Canvas = ({ children }) =>
  (
    <svg height="200" width="800">
      {children}
    </svg>
  );

Canvas.propTypes = {
  children: PropTypes.array.isRequired
};

const TimelineDot = ({ position, txt }) =>
  (
    <g transform={`translate(${position},0)`}>
      <circle cy={160} r={5} style={{ fill: 'blue' }} />
      <text y={115} x={-95} transform="rotate(-45)" style={{ fontSize: '10px' }}>{txt}</text>
    </g>
  );

TimelineDot.propTypes = {
  position: PropTypes.number.isRequired,
  txt: PropTypes.string.isRequired
};

export default class Timeline extends React.Component {
  constructor(props) {
    const data = [
      {
        year: 1879,
        event: "Ski Manufacturing Begins"
      },
      {
        year: 1882,
        event: "US Ski Club Founded"
      },
      {
        year: 1924,
        event: "First Winter Olympics Held"
      },
      {
        year: 1926,
        event: "First US Ski Shop Opens"
      },
      {
        year: 1932,
        event: "North Americas First Rope Tow Spins"
      },
      {
        year: 1936,
        event: "First Chairlift Spins"
      },
      {
        year: 1949,
        event: "Squaw Valley, Mad River Glen Open"
      },
      {
        year: 1958,
        event: "First Gondola Spins"
      },
      {
        year: 1964,
        event: "Plastic Buckle Boots Available"
      }
    ];

    const times = d3.extent(data.map(d => d.year));
    const range = [50, 750];
    super(props);
    this.scale = d3.scaleLinear().domain(times).range(range);
    this.state = { data, times, range };
  }

  render() {
    return (
      <div className="timeline">
        <h1>{this.props.name} Timeline</h1>
        <Canvas>
          {this.state.data.map((d, i) =>
            <TimelineDot key={i} position={this.scale(d.year)} txt={`${d.year} - ${d.event}`} />
          )}
        </Canvas>
      </div>
    );
  }

}

Timeline.propTypes = {
  name: PropTypes.string.isRequired
};