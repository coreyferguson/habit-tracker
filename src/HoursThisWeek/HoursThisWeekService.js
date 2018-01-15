
const moment = require('moment');

class HoursThisWeekService {

  getDates(data) {
    return data.map(s => moment(new Date(s)));
  }

  filterThisWeek(dates, startTime) {
    startTime = startTime || moment().startOf('week');
    const endTime = moment(startTime);
    endTime.utc().endOf('week');
    return dates.filter(date => {
      return date.isAfter(startTime) && date.isBefore(endTime);
    });
  }

}

module.exports = new HoursThisWeekService();
