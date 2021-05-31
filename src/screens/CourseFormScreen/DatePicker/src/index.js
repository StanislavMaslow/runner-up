/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import format from 'date-fns/format';
import add from 'date-fns/add';
import set from 'date-fns/set';
import CalendarSelect from './CalendarSelect';
import CommonFn from './commonFn';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      minDate: CommonFn.ymd(props.minDate || '1900-01-01'),
      maxDate: CommonFn.ymd(props.maxDate || '2200-01-01'),
      yearMonth: CommonFn.ym(props.date),
    };
  }

  calendarChange(type, unit) {
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment
      yearMonth: format(add((new Date(this.state.yearMonth)), { [unit]: type }), 'yyyy-MM'),
    });
  }

  selectDate(val) {
    const { date } = this.state;
    const yearMonthDayArr = val.split('-');
    this.setState({
      date: set(date, {
        year: parseInt(yearMonthDayArr[0], 10),
        month: parseInt(yearMonthDayArr[1], 10) - 1,
        date: parseInt(yearMonthDayArr[2], 10),
      }),
    }, () => {
      this.dateCallback();
    });
  }

  dateCallback() {
    const { changeDate, format: dateFormat } = this.props;
    const { date } = this.state;
    // eslint-disable-next-line no-unused-expressions
    changeDate && changeDate(format(set((date), { miliseconds: 0 }), dateFormat));
  }

  render() {
    const {
      minDate,
      maxDate,
      date,
      yearMonth,
    } = this.state;
    const { containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <CalendarSelect
          {...this.props}
          calendarMonth={yearMonth}
          date={format((new Date(date)), 'yyyy-MM-dd')}
          minDate={minDate}
          maxDate={maxDate}
          selectDate={(item) => this.selectDate(item)}
          calendarChange={(type, unit) => this.calendarChange(type, unit, 'start')}
          redEvent={this.props.redEvent}
          greenEvent={this.props.greenEvent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: '47%', // 360
  },
});
