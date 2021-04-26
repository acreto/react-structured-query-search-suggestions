import React, { Component } from 'react'
import propTypes from 'prop-types'

/**
 * Encapsulates the rendering of an option that has been "selected" in a
 * TypeaheadTokenizer
 */
export default class Token extends Component {
  static propTypes = {
    children: propTypes.object,
    onRemoveToken: propTypes.func,
    editToken: propTypes.func
  };

  _makeCloseButton() {
    if (!this.props.onRemoveToken) {
      return ''
    }
    return (
      <a
        className='typeahead-token-close'
        href='javascript:void(0)'
        onClick={(event) => {
          this.props.onRemoveToken(this.props.children)
          event.preventDefault()
        }}
      >
        &#x00d7;
      </a>
    )
  }

  getTokenValue() {
    const value = this.props.children['value']
    if (value && typeof value === 'object') {
      return value[this.props.fuzzySearchKeyAttribute]
    } else {
      return value
    }
  }

  getTokenItem() {
    if (this.props.renderTokenItem) {
      return this.props.renderTokenItem(this.props)
    } else {
      const val = this.props.children
      if (val['isAllowFreeSearch']) {
        return this.getTokenValue()
      }
      return `${val['category']} ${val.operator == undefined ? '' : val.operator} "${this.getTokenValue()}" `
    }
  }

  render() {
    return (
      <div className='typeahead-token'
        title={this.props.editToken ? 'Click to toggle the operator' : ''}
        onClick={() => {
          if (this.props.editToken) {
            this.props.editToken(this.props.children)
          }
        }}
      >
        {this.getTokenItem()}
        {this._makeCloseButton()}
      </div>
    )
  }
}
