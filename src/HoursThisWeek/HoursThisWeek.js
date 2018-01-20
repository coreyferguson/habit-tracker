
const React = require('react');
const service = require('../timeService');

class HoursThisWeek extends React.Component {

  constructor(props) {
    super(props);
    const datesThisWeek = service.filterThisWeek();
    this.hours = service.hoursPerDay(datesThisWeek);
  }

  render() {
    return (
      <div className='row'>
        <div className='col s12'>
          <h2>Hours This Week</h2>
        </div>
        <div className='col s12 m9'>
          <canvas ref={(element) => { this.chart = element; }}></canvas>
        </div>
        <div className='col s12 m3'>
          <table className='bordered'>
            <tbody>
              <tr>
                <td>Total hours this week</td>
                <td>{Math.round(this.getTotalHours())}</td>
              </tr>
              <tr>
                <td>Average hours per day</td>
                <td>{Math.round(this.getAverageHours())}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const ctx = this.chart.getContext('2d');
    let data = [0, 0, 0, 0, 0, 0, 0];
    const day = moment().startOf('week');
    for (let i=0; i<7; i++) {
      if (this.hours[day.format('YYYY-MM-DD')])
        data[i] += this.hours[day.format('YYYY-MM-DD')];
      day.add(1, 'day');
    }
    data = data.map(d => d.toFixed(2));
    const chart = new Chart(ctx, {
      type: 'bar',
      options: {
        legend: { display: false }
      },
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: 'Hours',
          data: data,
          backgroundColor: 'rgba(139, 195, 74, 0.5)',
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
    const average = totalHours / 7;
    return average;
  }

}

module.exports = HoursThisWeek;

