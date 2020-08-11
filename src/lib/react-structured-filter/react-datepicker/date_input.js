import React, { Component } from "react";
import propTypes from "prop-types";
import moment from "moment";

export default class DateInput extends Component {
  static propTypes = {
    onKeyDown: propTypes.func
  };

  constructor(props) {
    super(props);
    this.entryRef = null;
  }

  componentDidMount() {
    this.toggleFocus(this.props.focus);
  }

  componentWillReceiveProps(newProps) {
    this.toggleFocus(newProps.focus);
  }

  toggleFocus(focus) {
    if (focus) {
      this.entryRef.focus();
    } else {
      this.entryRef.blur();
    }
  }

  handleChange = event => {
    var date = moment(event.target.value, this.props.dateFormat, true);

    this.props.setSelected(date)
  };

  safeDateFormat(date) {
    return !!date ? date.format(this.props.dateFormat) : null;
  }

  isValueAValidDate() {
    var date = moment(this.props.date, this.props.dateFormat, true);

    return date.isValid();
  }

  handleEnter() {
    this.props.handleEnter()
  }

  handleKeyDown = event => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        this.handleEnter(event);
        break;
      case "Backspace":
        this.props.onKeyDown(event);
        break;
    }
  };

  handleClick = event => {
    this.props.handleClick(event);
  };

  render() {
    const date = this.safeDateFormat(this.props.date)
    return (
      <input
        ref={ref => (this.entryRef = ref)}
        type="text"
        value={date}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        onFocus={this.props.onFocus}
        onChange={this.handleChange}
        className="datepicker__input"
        placeholder={this.props.placeholderText}
      />
    );
  }
}