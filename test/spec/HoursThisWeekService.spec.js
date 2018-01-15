
const service = require('../../src/HoursThisWeek/HoursThisWeekService');
const expect = require('chai').expect;
const moment = require('moment');

describe('HoursThisWeekService', () => {

  it('getDates', () => {
    const dates = service.getDates([
      '2018-01-12T00:11:19Z', '2018-01-12T01:36:49Z',
      '2018-01-13T23:29:46Z', '2018-01-14T01:03:59Z'
    ]);
    expect(dates[0].utc().format()).to.eql('2018-01-12T00:11:19Z');
    expect(dates[1].utc().format()).to.eql('2018-01-12T01:36:49Z');
    expect(dates[2].utc().format()).to.eql('2018-01-13T23:29:46Z');
    expect(dates[3].utc().format()).to.eql('2018-01-14T01:03:59Z');
  });

  it('filterThisWeek', () => {
    const dates = service.getDates([
      '2018-01-13T01:00:00Z', '2018-01-13T02:00:00Z',
      '2018-01-13T23:00:00Z', '2018-01-14T01:00:00Z',
      '2018-01-14T02:00:00Z', '2018-01-14T03:00:00Z',
      '2018-01-15T01:00:00Z', '2018-01-15T02:00:00Z',
      '2018-01-16T01:00:00Z', '2018-01-16T02:00:00Z',
      '2018-01-17T01:00:00Z', '2018-01-17T02:00:00Z',
      '2018-01-18T01:00:00Z', '2018-01-18T02:00:00Z',
      '2018-01-19T01:00:00Z', '2018-01-19T02:00:00Z',
      '2018-01-20T01:00:00Z', '2018-01-20T02:00:00Z',
      '2018-01-20T23:00:00Z', '2018-01-21T01:00:00Z',
      '2018-01-21T02:00:00Z', '2018-01-21T03:00:00Z'
    ]);
    const filtered = service.filterThisWeek(dates, moment(new Date('2018-01-14T00:00:00Z')));
    expect(filtered.length).to.equal(16);
    expect(filtered[0].utc().format()).to.eql('2018-01-13T23:00:00Z');
    expect(filtered[1].utc().format()).to.eql('2018-01-14T01:00:00Z');
    expect(filtered[2].utc().format()).to.eql('2018-01-14T02:00:00Z');
    expect(filtered[3].utc().format()).to.eql('2018-01-14T03:00:00Z');
    expect(filtered[4].utc().format()).to.eql('2018-01-15T01:00:00Z');
    expect(filtered[5].utc().format()).to.eql('2018-01-15T02:00:00Z');
    expect(filtered[6].utc().format()).to.eql('2018-01-16T01:00:00Z');
    expect(filtered[7].utc().format()).to.eql('2018-01-16T02:00:00Z');
    expect(filtered[8].utc().format()).to.eql('2018-01-17T01:00:00Z');
    expect(filtered[9].utc().format()).to.eql('2018-01-17T02:00:00Z');
    expect(filtered[10].utc().format()).to.eql('2018-01-18T01:00:00Z');
    expect(filtered[11].utc().format()).to.eql('2018-01-18T02:00:00Z');
    expect(filtered[12].utc().format()).to.eql('2018-01-19T01:00:00Z');
    expect(filtered[13].utc().format()).to.eql('2018-01-19T02:00:00Z');
    expect(filtered[14].utc().format()).to.eql('2018-01-20T01:00:00Z');
    expect(filtered[15].utc().format()).to.eql('2018-01-20T02:00:00Z');
  });

  it('hoursPerDay', () => {
    const dates = service.getDates([
      '2018-01-13T23:30:00Z', '2018-01-14T00:15:00Z',
      '2018-01-14T02:00:00Z', '2018-01-14T03:00:00Z',
      '2018-01-15T01:00:00Z', '2018-01-15T04:00:00Z',
      '2018-01-16T01:00:00Z', '2018-01-16T05:00:00Z',
      '2018-01-17T01:00:00Z', '2018-01-17T02:00:00Z',
      '2018-01-17T02:00:00Z', '2018-01-17T03:00:00Z',
      '2018-01-17T05:00:00Z', '2018-01-17T06:00:00Z',
      '2018-01-18T01:00:00Z', '2018-01-18T07:00:00Z',
      '2018-01-19T01:00:00Z', '2018-01-19T08:00:00Z',
      '2018-01-20T11:00:00Z', '2018-01-20T13:00:00Z'
    ]);
    const hoursPerDay = service.hoursPerDay(dates);
    expect(hoursPerDay).to.eql([1.75, 3, 4, 3, 6, 7, 2]);
  });

});
