
const React = require('react');
const HoursThisWeek = require('./HoursThisWeek');
const HoursThisMonth = require('./HoursThisMonth');
import './styles.scss';

module.exports = props => {
  return (
    <div>
      <nav className='hero'>
        <div className='nav-wrapper'>
          <div className='brand-logo'>
            Study Time
          </div>
        </div>
      </nav>
      <div className='container'>
        <HoursThisWeek />
        <HoursThisMonth />
      </div>
    </div>
  );
};
