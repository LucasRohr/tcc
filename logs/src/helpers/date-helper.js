import moment from 'moment'

import { DATE_HOUR_FORMAT, DATE_FORMAT, API_FULL_DATE_FORMAT } from 'app-constants'

class DateHelper {
  constructor({ date, time }, customFormat) {
    const format = time ? DATE_HOUR_FORMAT : DATE_FORMAT
    const dateString = time ? `${date} ${time}` : date

    return moment(dateString, customFormat || format)
  }

  static toISOString(date, format) {
    const moment = new DateHelper(date, format)
    return moment.toISOString()
  }

  static fromUTC(date) {
    return moment.utc(date, API_FULL_DATE_FORMAT).local()
  }

  static now() {
    return moment()
  }

  static getDefaultDateWithTime(time) {
    const [hours, minutes = '00'] = time.toString().split(':')
    return moment({ hours, minutes })
  }
}

export { DateHelper }
