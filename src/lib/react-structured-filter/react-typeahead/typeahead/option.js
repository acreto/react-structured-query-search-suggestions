import React, { Component } from "react";
import propTypes from "prop-types";
import classNames from "classNames";

/**
 * A single option within the TypeaheadSelector
 */
export default class TypeaheadOption extends Component {
  static propTypes = {
    customClasses: propTypes.object,
    onClick: propTypes.func,
    children: propTypes.oneOfType([propTypes.string, propTypes.object])
  };

  static defaultProps = {
    customClasses: {},
    onClick: function(event) {
      event.preventDefault();
    }
  };

  constructor(props) {
    super(props);
    this.anchorRef = null;
    this.state = {
      hover: false
    };
  }

  _getClasses() {
    var classes = {
      "typeahead-option": true
    };
    classes[this.props.customClasses.listAnchor] = !!this.props.customClasses.listAnchor;
    return classNames(classes);
  }

  _onClick = e => {
    e.stopPropagation();
    if (this.props.disabled) {
      return;
    }
    return this.props.onClick();
  };

  render() {
    var classes = {
      hover: this.props.hover,
      disabled: this.props.disabled
    };
    classes[this.props.customClasses.listItem] = !!this.props.customClasses.listItem;
    var classList = classNames(classes);

    return (
      <li className={classList} onClick={this._onClick}>
        <a className={this._getClasses()} ref={ref => (this.anchorRef = ref)}>
          {this.props.children}
        </a>
      </li>
    );
  }
}