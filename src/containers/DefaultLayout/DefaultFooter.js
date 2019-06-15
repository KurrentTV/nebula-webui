import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span><a href="https://nebulabroadcast.com">Nebula</a> &copy; 2019 Nebula Broadcast.</span>
        <span className="ml-auto">This GUI is Made with <i className="fa fa-heart" style={{color: '#e83e8c'}}></i> by <a href="https://kurrent.tv">Kurrent TV</a>.</span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
