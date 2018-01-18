
const React = require('react');
const service = require('../timeService');

class HoursThisWeek extends React.Component {

  render() {
    return (
      <div className='col s12 m6'>
        <canvas ref={(element) => { this.chart = element; }}></canvas>
      </div>
    );
  }

  componentDidMount() {
    const datesThisWeek = service.filterThisWeek();
    const hours = service.hoursPerDay(datesThisWeek);
    const ctx = this.chart.getContext('2d');
    let data = [0, 0, 0, 0, 0, 0, 0];
    const day = moment().startOf('week');
    for (let i=0; i<7; i++) {
      if (hours[day.format('YYYY-MM-DD')])
        data[i] += hours[day.format('YYYY-MM-DD')];
      day.add(1, 'day');
    }
    data = data.map(d => d.toFixed(2));
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
          data: data,
          backgroundColor: 'rgba(244, 67, 54, 0.5)',
          borderWidth: 1
        }]
      }
    });
  }

}

module.exports = HoursThisWeek;

