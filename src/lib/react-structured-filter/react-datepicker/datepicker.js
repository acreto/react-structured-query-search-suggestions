import React, { Component } from "react";
import propTypes from "prop-types";

import Popover from "./popover";
import Calendar from "./calendar";
import DateInput from "./date_input";
import moment from 'moment'

export default class DatePicker extends Component {
  static propTypes = {
    onChange: propTypes.func,
    onKeyDown: propTypes.func
  };

  constructor(props) {
    super(props);
    this.dateinputRef = null;
    this.state = {
      focus: true,
      showCalender:true,
      selected:moment()
    };
  }

  handleFocus = () => {
    this.setState({
      focus: true
    });
  };

  hideCalendar = () => {
    this.setState({
      focus: true,
      showCalender:false
    });
  };

  handleSubmit=()=>{
    this.props.onChange(this.state.selected);
  }

  handleSelect = date => {
    this.hideCalendar();
    this.setSelected(date);
  };

  setSelected = date => {
    this.setState({selected:date})
  };

  onInputClick = () => {
    this.setState({
      focus: true,
      showCalender:true
    });
  };

  calendar() {
    if (this.state.focus && this.state.showCalender) {
      return (
        <Popover>
          <Calendar
            selected={this.state.selected}
            onSelect={this.handleSelect}
            hideCalendar={this.hideCalendar}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
          />
        </Popover>
      );
    }
  }

  render() {
    return (
      <div>
        <DateInput
          ref={ref => (this.dateinputRef = ref)}
          date={this.state.selected}
          dateFormat={this.props.dateFormat}
          focus={this.state.focus}
          onFocus={this.handleFocus}
          onKeyDown={this.props.onKeyDown}
          handleClick={this.onInputClick}
          handleEnter={this.handleSubmit}
          setSelected={this.setSelected}
          hideCalendar={this.hideCalendar}
          placeholderText={this.props.placeholderText}
        />
        {this.calendar()}
      </div>
    );
  }
}