// import moment from 'moment';
import setDay from 'date-fns/setDay';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';

export default class CommonFn {
  static calendarArray(date) {
    const dates = [];
    for (let i = 0; i < 42; i += 1) {
      const startDate = setDay(new Date(date), 0);
      dates[i] = format(addDays(new Date(startDate), i), 'yyyy-MM-dd');
    }
    return dates;
  }

  static ym(date) {
    let dateValue = null;
    if (date === undefined) {
      dateValue = new Date(null);
    } else {
      dateValue = new Date(date);
    }
    return format(dateValue, 'yyyy-MM');
  }

  static ymd(date) {
    let dateValue = null;
    if (date === undefined) {
      dateValue = new Date(null);
    } else {
      dateValue = new Date(date);
    }
    return format(dateValue, 'yyyy-MM-dd');
  }
}
