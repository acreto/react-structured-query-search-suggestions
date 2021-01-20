import React, { Component } from "react";

import Day from "./day";
import DateUtil from "./util/date";
import moment from "moment";
import InputTime from './inputTime'

import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";
import {isValid, addZero} from './util'
class Calendar extends Component {
  constructor(props) {
    super(props);
    const time = new Date(this.props.selected);
    const validDate =  new DateUtil(isValid(time) ? this.props.selected : moment()).safeClone(moment())
    this.state = {
      date: validDate,
      selected: validDate
    };
  }

  // TODO Hide Calendar
  handleClickOutside = () => {
    this.props.hideCalendar();
  };

  increaseMonth = () => {
    this.setState({
      date: this.state.date.addMonth()
    });
  };

  decreaseMonth = () => {
    this.setState({
      date: this.state.date.subtractMonth()
    });
  };

  weeks() {
    return this.state.date.mapWeeksInMonth(this.renderWeek);
  }

  handleDayClick(day) {
    const time = new Date(this.state.selected._date);
    this.setState({
      selected: day.set({
        hour:getHours(time),
        minute:getMinutes(time),
        second:getSeconds(time)
      })
    })
  }

  renderWeek = (weekStart, key) => {
    if (!weekStart.weekInMonth(this.state.date)) {
      return;
    }

    return <div key={key}>{this.days(weekStart)}</div>;
  };

  renderDay = (day, key) => {
    var minDate = new DateUtil(this.props.minDate).safeClone(),
      maxDate = new DateUtil(this.props.maxDate).safeClone(),
      disabled = day.isBefore(minDate) || day.isAfter(maxDate);

    return (
      <Day
        key={key}
        day={day}
        date={this.state.date}
        onClick={this.handleDayClick.bind(this, day)}
        selected={this.state.selected}
        disabled={disabled}
      />
    );
  };

  days(weekStart) {
    return weekStart.mapDaysInWeek(this.renderDay);
  }

  handleTimeChange = time => {
    this.setState({
      selected: this.state.selected.set({
        hour:getHours(time),
        minute:getMinutes(time),
        second:getSeconds(time),
      })
    });
  };

  render() {
    const time = new Date(this.state.selected._date);
    const timeValid = isValid(time) && Boolean(this.state.selected);
    const timeString = timeValid
      ? `${addZero(time.getHours())}:${addZero(time.getMinutes())}:${addZero(time.getSeconds())}`
      : "";
    const timeInputLabel = 'Time:'
    return (
      <div className="datepicker">
        <div className="datepicker__triangle" />
        <div className="datepicker__header">
          <a className="datepicker__navigation datepicker__navigation--previous" onClick={this.decreaseMonth} />
          <span className="datepicker__current-month">{this.state.date.format("MMMM YYYY")}</span>
          <a className="datepicker__navigation datepicker__navigation--next" onClick={this.increaseMonth} />
          <div>
            <div className="datepicker__day">Mo</div>
            <div className="datepicker__day">Tu</div>
            <div className="datepicker__day">We</div>
            <div className="datepicker__day">Th</div>
            <div className="datepicker__day">Fr</div>
            <div className="datepicker__day">Sa</div>
            <div className="datepicker__day">Su</div>
          </div>
        </div>
        <div className="datepicker__month">{this.weeks()}</div>
        <div className={'datepicker__time--action'}>
          <InputTime
            timeString={timeString}
            timeInputLabel={timeInputLabel}
            onChange={this.handleTimeChange}
          />
          <div className="datepicker__action">
            <button onClick={()=>this.props.onSelect(this.state.selected.moment())}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;