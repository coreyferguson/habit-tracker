
const React = require('react');
const service = require('../timeService');

class HoursThisMonth extends React.Component {

  constructor(props) {
    super(props);
    this.dates = service.filterLast30Days();
    this.hours = service.hoursPerDay(this.dates);
  }

  render() {
    return (
      <div className='row'>
        <div className='col s12 m3'>
          <h2>Hours This Month</h2>
          <table className='bordered'>
            <tbody>
              <tr>
                <td>Total</td>
                <td>{Math.round(this.getTotalHours())}</td>
              </tr>
              <tr>
                <td>Average</td>
                <td>{Math.round(this.getAverageHours())}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col s12 m9'>
          <canvas ref={(element) => { this.chart = element; }}></canvas>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const ctx = this.chart.getContext('2d');
    const data = [];
    const labels = [];
    const day = moment().add(-30, 'day');
    while (day.isBefore(this.dates[length-1])) {
      const key = day.format('YYYY-MM-DD');
      labels.push(day.format('Do'));
      const h = this.hours[key] || 0;
      data.push(h.toFixed(2));
      day.add(1, 'day');
    }

    const chart = new Chart(ctx, {
      type: 'bar',
      options: {
        legend: { display: false }
      },
      data: {
        labels,
        datasets: [{
          label: 'Hours',
          data,
          backgroundColor: 'rgba(70, 175, 70, 0.5)',
          borderWidth: 1
        }]
      }
    });
  }

  getTotalHours() {
    let totalHours = 0;
    for (let key in this.hours) {
      totalHours += this.hours[key];
    }
    return totalHours;
  }

  getAverageHours() {
    const totalHours = this.getTotalHours();
    const average = totalHours / 30;
    return average;
  }

}

module.exports = HoursThisMonth;

