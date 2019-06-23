import React, { Component } from 'react';
import CookiesHelper from '../utils/CookiesHelper';

export default function (ComposedComponent) {
  class Authentication extends Component {
    state = {

    }

    componentWillMount() {
      if (!CookiesHelper.getCookie('session_id')) {

        this.props.history.push("/login");
      } else {
      }
    }

    componentWillUnmount() {
        
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return Authentication;
}
