
const React = require('react');
const HoursThisWeek = require('./HoursThisWeek');
const HoursThisMonth = require('./HoursThisMonth');

module.exports = props => {
  return (
    <div className='container'>
      <div className='row'>
        <HoursThisWeek />
        <HoursThisMonth />
      </div>
    </div>
  );
};
