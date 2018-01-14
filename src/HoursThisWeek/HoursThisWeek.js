
const React = require('react');
const data = require('../data.json');

const dates = data.map(s => new Date(s));
console.log('dates:', dates);

module.exports = props => {
  return (
    <h2>Hours this week</h2>
  );
};
