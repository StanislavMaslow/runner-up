/* eslint-disable max-len */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import { Ionicons } from '@expo/vector-icons';
import CommonFn from './commonFn';
import styles from './styles/CalendarSelectStyles';

class CalendarSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'day',
    };
  }

  // eslint-disable-next-line react/sort-comp
  renderDay(day) {
    const {
      calendarMonth, date, warpDayStyle, dateSelectedWarpDayStyle,
      textDayStyle, currentDayStyle, notCurrentDayOfMonthStyle,
    } = this.props;
    const isCurrentMonth = calendarMonth === CommonFn.ym();
    const isCurrent = isCurrentMonth && CommonFn.ymd() === day;
    const dateSelected = date && CommonFn.ymd(date) === day;
    const notCurrentMonth = day.indexOf(calendarMonth) !== 0;
    return (
      <TouchableOpacity
        onPress={() => this.selectDate(day)}
        style={[styles.warpDay, warpDayStyle,
          dateSelected ? {
            backgroundColor: '#20BE56', borderRadius: 50, width: 43, marginHorizontal: 6.54, ...dateSelectedWarpDayStyle,
          } : {}]}
      >
        <View>
          {/* {renderChildDay(day)} */}
          <Text style={[styles.day, textDayStyle,
            isCurrent ? { color: 'red', ...currentDayStyle } : {},
            notCurrentMonth ? { color: '#493D40', ...notCurrentDayOfMonthStyle } : {}]}
          >
            {day.split('-')[2]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  selectDate(date) {
    if (this.isDateEnable(date)) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.selectDate(date);
    }
  }

  yearMonthChange(type, unit) {
    const { viewMode, currentYear } = this.state;
    if (viewMode === 'day') {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.calendarChange(type, unit);
    } else {
      this.setState({
        currentYear: currentYear + (type < 0 ? -12 : 12),
      });
    }
  }

  isDateEnable(date) {
    const { minDate, maxDate } = this.props;
    return date >= minDate && date <= maxDate;
  }

  render() {
    const {
      calendarMonth, renderPrevMonthButton,
      renderNextYearButton,
      weekdayStyle, customWeekdays, warpRowWeekdays,
      warpRowControlMonthYear, txtHeaderDateStyle,
    } = this.props;
    const weekdays = customWeekdays || ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const data = CommonFn.calendarArray(calendarMonth);
    const dayOfWeek = [];
    _.forEach(weekdays, (element) => {
      dayOfWeek.push(<Text key={element} style={[styles.weekdays, weekdayStyle]}>{element}</Text>);
    });
    const getMonthName = (month) => {
      const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[parseInt(month, 10)].toUpperCase();
    };

    return (
      <View style={styles.container}>
        <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }, warpRowControlMonthYear]}>
          <TouchableOpacity onPress={() => this.yearMonthChange(-1, 'months')}>
            {renderPrevMonthButton ? renderPrevMonthButton() : <View style={styles.arrowIconContainer}><Ionicons name="chevron-back-outline" size={17} color="white" /></View>}
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.txtHeaderDate, txtHeaderDateStyle]}>{getMonthName(calendarMonth.split('-')[1])}</Text>
            <Text style={[styles.txtHeaderDate, txtHeaderDateStyle]}>{calendarMonth.split('-')[0]}</Text>
          </View>
          <TouchableOpacity onPress={() => this.yearMonthChange(1, 'months')}>
            {renderNextYearButton ? renderNextYearButton() : <View style={styles.arrowIconContainer}><Ionicons name="chevron-forward-outline" size={17} color="white" /></View>}
          </TouchableOpacity>
        </View>
        <View style={[{ flexDirection: 'row', justifyContent: 'space-around' }, warpRowWeekdays]}>
          {dayOfWeek}
        </View>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => this.renderDay(item)}
          extraData={this.state}
          numColumns={7}
        />
      </View>
    );
  }
}

const propTypes = {
  customWeekdays: PropTypes.array,
  // renderPrevYearButton: PropTypes.func,
  renderPrevMonthButton: PropTypes.func,
  renderNextYearButton: PropTypes.func,
  // renderNextMonthButton: PropTypes.func,
  // style
  warpRowControlMonthYear: PropTypes.object,
  warpRowWeekdays: PropTypes.object,
  weekdayStyle: PropTypes.object,
  txtHeaderDateStyle: PropTypes.object,
  textDayStyle: PropTypes.object,
  currentDayStyle: PropTypes.object,
  notCurrentDayOfMonthStyle: PropTypes.object,
  warpDayStyle: PropTypes.object,
  dateSelectedWarpDayStyle: PropTypes.object,

};

const defaultProps = {
  customWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
};

CalendarSelect.propTypes = propTypes;
CalendarSelect.defaultProps = defaultProps;
export default CalendarSelect;
