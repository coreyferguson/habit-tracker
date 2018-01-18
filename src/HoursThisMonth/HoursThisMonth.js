
const React = require('react');
const service = require('../timeService');

class HoursThisMonth extends React.Component {

  render() {
    return (
      <div className='col s12 m9'>
        <canvas ref={(element) => { this.chart = element; }}></canvas>
      </div>
    );
  }

  componentDidMount() {
    const dates = service.filterLast30Days();
    const hours = service.hoursPerDay(dates);
    console.log('hours:', hours);
    const ctx = this.chart.getContext('2d');
    const data = [];
    const labels = [];
    const day = moment().add(-30, 'day');
    while (day.isBefore(dates[length-1])) {
      const key = day.format('YYYY-MM-DD');
      labels.push(day.format('Do'));
      const h = hours[key] || 0;
      data.push(h.toFixed(2));
      day.add(1, 'day');
    }

    // let data = hours.map(hour => hour);
    console.log('data:', data);
    console.log('labels:', labels);
    const chart = new Chart(ctx, {
      type: 'bar',
      options: {
        title: { display: true, text: 'Hours Last 30 Days' },
        legend: { display: false }
      },
      data: {
        labels,
        datasets: [{
          label: 'Hours',
          data,
          backgroundColor: 'rgba(244, 67, 54, 0.5)',
          borderWidth: 1
        }]
      }
    });
  }

}

module.exports = HoursThisMonth;

