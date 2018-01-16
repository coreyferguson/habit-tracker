
const moment = require('moment');
const data = require('../data.json');

class TimeService {

  constructor(options) {
    options = options || {};
    this._data = options.data || data;
    this._dates = this._data.map(s => moment(new Date(s)));
  }

  filterThisWeek(weekOf) {
    weekOf = weekOf || moment();
    weekOf.startOf('week');
    const endTime = moment(weekOf);
    endTime.endOf('week');
    const filtered = [];
    for (let i=1; i<this._dates.length; i+=2) {
      const date = this._dates[i];
      if (date.isAfter(weekOf) && date.isBefore(endTime)) {
        filtered.push(this._dates[i-1]);
        filtered.push(date);
      }
    }
    return filtered;
  }

  hoursPerDay(dates) {
    dates = dates || this._dates;
    let hoursPerDay = {};
    for (let i=1; i<dates.length; i+=2) {
      const start = dates[i-1];
      const end = dates[i];
      const hours = end.diff(start, 'hours', true);
      if (hoursPerDay[end.format('YYYY-MM-DD')] === undefined) {
        hoursPerDay[end.format('YYYY-MM-DD')] = hours;
      } else {
        hoursPerDay[end.format('YYYY-MM-DD')] += hours;
      }
    }
    // hoursPerDay = hoursPerDay.map(hours => hours.toFixed(2));
    return hoursPerDay;
  }

}

module.exports = TimeService;
