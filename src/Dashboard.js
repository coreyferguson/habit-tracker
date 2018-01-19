
const React = require('react');
const HoursThisWeek = require('./HoursThisWeek');
const HoursThisMonth = require('./HoursThisMonth');
import './styles.scss';

module.exports = props => {
  return (
    <div className='container'>
      <nav className='hero'>
        <div className='nav-wrapper'>
          <div className='brand-logo'>
            Study Time
          </div>
        </div>
      </nav>


      <HoursThisWeek />
      <HoursThisMonth />
    </div>
  );
};
