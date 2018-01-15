
const React = require('react');
const data = require('../data.json');
const service = require('./HoursThisWeekService');

class HoursThisWeek extends React.Component {

  render() {
    return (
      <div className='row'>
        <canvas
          className='col s12'
          height='400px'
          ref={(element) => { this.chart = element; }}>
        </canvas>
      </div>
    );
  }

  componentDidMount() {
    const dates = service.getDates(data);
    const datesThisWeek = service.filterThisWeek(dates);
    const hours = service.hoursPerDay(datesThisWeek);
    const ctx = this.chart.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      options: {
        title: { display: true, text: 'Hours This Week' },
        legend: { display: false }
      },
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: 'Hours',
          data: hours,
          backgroundColor: 'rgba(244, 67, 54, 0.5)',
          borderWidth: 1
        }]
      }
    })
  }

}

module.exports = HoursThisWeek;

