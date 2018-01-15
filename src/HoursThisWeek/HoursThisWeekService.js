
const moment = require('moment');

class HoursThisWeekService {

  getDates(data) {
    return data.map(s => moment(new Date(s)));
  }

  filterThisWeek(dates, startTime) {
    startTime = startTime || moment();
    startTime.startOf('week');
    const endTime = moment(startTime);
    endTime.endOf('week');
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
    let hoursPerDay = [0, 0, 0, 0, 0, 0, 0];
    for (let i=1; i<dates.length; i+=2) {
      const start = dates[i-1];
      const end = dates[i];
      const hours = end.diff(start, 'hours', true);
      hoursPerDay[end.day()] += hours;
    }
    hoursPerDay = hoursPerDay.map(hours => hours.toFixed(2));
    return hoursPerDay;
  }

}

module.exports = new HoursThisWeekService();
