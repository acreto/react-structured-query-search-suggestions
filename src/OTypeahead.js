import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typeahead } from "./lib/react-structured-filter/react-typeahead/react-typeahead";

// Override the Tokenizer
export default class OTypeahead extends Typeahead {
	componentWillReceiveProps(nextProps) {
		this.fuzzySearchKeyAttribute = nextProps.fuzzySearchKeyAttribute || this.props.fuzzySearchKeyAttribute;
		let inputRef = this.getInputRef(),
			isValueEmpty = inputRef == undefined || inputRef.value == "";
		this.setState({
			options: nextProps.options,
			header: nextProps.header,
			datatype: nextProps.datatype,
			visible: this.getOptionsForValue(isValueEmpty ? null : inputRef.value, nextProps.options)
		});
	}

	_onOptionSelected(option) {
		if (option !== this.props.fuzzySearchEmptyMessage) {
			var nEntry = this.entryRef;
			nEntry.focus();
			if (typeof option == "object") {
				nEntry.value = option[this.props.fuzzySearchKeyAttribute];
			} else {
				nEntry.value = option;
			}
			this.setState({
				visible: this.getOptionsForValue(option, this.props.options),
				selection: option,
				entryValue: option
			});
			this.props.onOptionSelected(option);
		}
	}

	_getTypeaheadInput({ classList, inputClassList }) {
		return (
			<div className={classList}>
				<span ref={ref => (this.inputRef = ref)} onFocus={this._onFocus}>
					<input
						ref={ref => (this.entryRef = ref)}
						type={this.state.datatype == "number" ? "number" : "text"}
						placeholder={this.props.placeholder}
						className={inputClassList}
						defaultValue={this.state.entryValue}
						onChange={this._onTextEntryUpdated}
						onKeyDown={this._onKeyDown}
						disabled={this.props.disabled}
					/>
					{this._renderIncrementalSearchResults()}
				</span>
			</div>
		);
	}
}