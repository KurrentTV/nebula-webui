import React, { Component } from 'react';
import CookiesHelper from '../utils/CookiesHelper';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (CookiesHelper.getCookie('session_id')) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return Authentication;
}
