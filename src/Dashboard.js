
const React = require('react');
const HoursThisWeek = require('./HoursThisWeek');

module.exports = props => {
  return (
    <div className='container'>
      <h1>Study Time</h1>

      <div className='row'>
        <HoursThisWeek />
      </div>
    </div>
  );
};
