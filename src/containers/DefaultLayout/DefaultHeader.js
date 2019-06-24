import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, height: 40, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, height: 40, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/settings">Settings</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users">Users</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/assets">Assets</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/copy">Copy</Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/jobs">Jobs</Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Scheduler</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Rundown</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Services</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Help</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown notif/>
          <DefaultHeaderDropdown tasks/>
          <DefaultHeaderDropdown mssgs/>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem>
          <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt/>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
