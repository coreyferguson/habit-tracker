
const React = require('react');
const HoursThisWeek = require('./HoursThisWeek');

module.exports = props => {
  return (
    <div className='container'>
      <h1>Dashboard</h1>
      <HoursThisWeek />
    </div>
  );
};
