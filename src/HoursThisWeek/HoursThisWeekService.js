
const moment = require('moment');

class HoursThisWeekService {

  getDates(data) {
    return data.map(s => moment(new Date(s)).utc());
  }

  filterThisWeek(dates, startTime) {
    startTime = startTime || moment().startOf('week');
    const endTime = moment(startTime);
    endTime.utc().endOf('week');
    const filtered = [];
    for (let i=1; i<dates.length; i+=2) {
      const date = dates[i];
      if (date.isAfter(startTime) && date.isBefore(endTime)) {
        filtered.push(dates[i-1]);
        filtered.push(date);
      }
    }
    return filtered;
  }

  hoursPerDay(dates) {
    const hoursPerDay = [0, 0, 0, 0, 0, 0, 0];
    for (let i=1; i<dates.length; i+=2) {
      const start = dates[i-1];
      const end = dates[i];
      const hours = end.diff(start, 'hours', true);
      hoursPerDay[end.day()] += hours;
    }
    return hoursPerDay;
  }

}

module.exports = new HoursThisWeekService();
