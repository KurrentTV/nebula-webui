import React, { Component } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Col,
  Collapse,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormText,
  FormFeedback,
  InputGroupText,
  Label,
} from 'reactstrap';

import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { rgbToHex } from '@coreui/coreui-pro/dist/js/coreui-utilities';

import classnames from "classnames";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

// React select
import displayoptions from "./display-options";
import Select from "react-select";
import "react-select/dist/react-select.min.css";

import data from "./_data";
import NebulaApi from "../../utils/api/NebulaApi";

const options = displayoptions.DOPTIONS;

class ThemeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bgColor: 'rgb(255, 255, 255)'
    }
  }

  componentDidMount () {
    const elem = ReactDOM.findDOMNode(this).parentNode.firstChild
    const color = window.getComputedStyle(elem).getPropertyValue('background-color')
    this.setState({
      bgColor: color || this.state.bgColor
    })
  }

  render() {

    return (
      <table className="w-100">
        <tbody>
        <tr>
        <div style={{ position:'relative' }}>
        <img style={{ width: '100%'}} src={'https://i.ytimg.com/vi/JcMtWwiyzpU/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDrgbnhwDdiXRalFbSoKURMXkw1PA'} alt="boohoo" className="img-responsive"/>
         <i style={{ position:'absolute' ,top:'50%' ,left:'50%' ,fontSize:'50px' ,margin:'-25px 0 0 -20px'}} className="fa fa-play-circle"></i>
         </div>
        <h5>schroedingers_room</h5>
          <i className="fa fa-flag" />
          <span>  </span>
          <button className="badge badge-block btn-primary" disabled>Movie</button>
          <span>  </span>
          <button className="badge badge-block btn-outline-secondary" disabled>00:24:49:05</button>
          <span>  </span>
          <button className="badge badge-block btn-outline-secondary" disabled>163.64GB</button>
          <span>  </span>
          <button className="badge badge-block btn-outline-secondary" disabled>25FPS</button>
          <span>  </span>
          <button className="badge badge-block btn-outline-secondary" disabled>DNXHD</button>
          <span>  </span>
          <button className="badge badge-block btn-outline-secondary" disabled>1920x1080</button>
        </tr>
        </tbody>
      </table>
    )
  }
}

class ThemeColor extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {

    // const { className, children, ...attributes } = this.props
    const { children, className } = this.props

    const classes = classNames(className, 'theme-color w-75 rounded mb-3')

    return (
      <Col xl="2" md="4" sm="6" xs="12" className="mb-4">
        {children}
        <ThemeView/>
      </Col>
    )
  }
}

class Copy extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };

    this.MainTable = data.rows;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: true,
      withFirstAndLast: false
    };
  }


  componentDidMount() {
    const payload = { object_type: "asset" };
    NebulaApi.getAssets(payload).then(
      res => {
        console.log(res.data);
      },
      err => {
        console.error(err);
      }
    );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-body">
            <Row>
              <Col xs="12" className="mb-4">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Main
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Fill
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "3"
                      })}
                      onClick={() => {
                        this.toggle("3");
                      }}
                    >
                      Music
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "4"
                      })}
                      onClick={() => {
                        this.toggle("4");
                      }}
                    >
                      Stories
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "5"
                      })}
                      onClick={() => {
                        this.toggle("5");
                      }}
                    >
                      Commercial
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "6"
                      })}
                      onClick={() => {
                        this.toggle("6");
                      }}
                    >
                      Archive
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "7"
                      })}
                      onClick={() => {
                        this.toggle("7");
                      }}
                    >
                      Incoming
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === "8"
                      })}
                      onClick={() => {
                        this.toggle("8");
                      }}
                    >
                      Trash
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="4" className="d-none d-sm-inline-block">
                        <ButtonToolbar
                          className="float-left"
                          aria-label="Toolbar with button groups"
                        >
                          <ButtonGroup
                            className="mr-3"
                            aria-label="First group"
                          >
                            <Button color="outline-secondary">
                              <i className="fa fa-th-list" />
                            </Button>
                            <Button color="outline-secondary" active>
                              <i className="fa fa-th-large" />
                            </Button>
                            <Button color="outline-secondary">
                              <i className="fa fa-gear" />
                            </Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                      <Col sm="4" className="d-none d-sm-inline-block">
                        <Button color="primary" className="float-left">
                          <i className="fa fa-plus" /> Add New Asset
                        </Button>
                      </Col>
                      <Col md="4">
                        <FormGroup className="float-right">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <Button
                                type="button"
                                color="btn btn-outline-dark btn-block"
                              >
                                <i className="fa fa-search" />
                              </Button>
                            </InputGroupAddon>
                            <Input
                              type="text"
                              id="input3-group2"
                              name="input3-group2"
                              placeholder="Search"
                            />
                            <InputGroupAddon addonType="append">
                              <Button
                                type="button"
                                color="btn btn-outline-dark btn-block"
                              >
                                <i className="fa fa-times" />
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <Select
                            name="form-field-name2"
                            value={this.state.value}
                            options={options}
                            onChange={this.saveChanges}
                            multi
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="card">
                      <div className="card-body">
                        <Row>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                          <ThemeColor>
                          </ThemeColor>
                        </Row>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                  <Row>
                    <Col sm="4" className="d-none d-sm-inline-block">
                      <ButtonToolbar
                        className="float-left"
                        aria-label="Toolbar with button groups"
                      >
                        <ButtonGroup
                          className="mr-3"
                          aria-label="First group"
                        >
                          <Button color="outline-secondary">
                            <i className="fa fa-th-list" />
                          </Button>
                          <Button color="outline-secondary">
                            <i className="fa fa-th-large" />
                          </Button>
                          <Button color="outline-secondary">
                            <i className="fa fa-gear" />
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </Col>
                    <Col sm="4" className="d-none d-sm-inline-block">
                      <Button color="primary" className="float-left">
                        <i className="fa fa-plus" /> Add New Asset
                      </Button>
                    </Col>
                    <Col md="4">
                      <FormGroup className="float-right">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <Button
                              type="button"
                              color="btn btn-outline-dark btn-block"
                            >
                              <i className="fa fa-search" />
                            </Button>
                          </InputGroupAddon>
                          <Input
                            type="text"
                            id="input3-group2"
                            name="input3-group2"
                            placeholder="Search"
                          />
                          <InputGroupAddon addonType="append">
                            <Button
                              type="button"
                              color="btn btn-outline-dark btn-block"
                            >
                              <i className="fa fa-times" />
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Select
                          name="form-field-name2"
                          value={this.state.value}
                          options={options}
                          onChange={this.saveChanges}
                          multi
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <BootstrapTable
                    data={this.MainTable}
                    version="4"
                    striped
                    hover
                    pagination
                    options={this.options}
                  >
                    <TableHeaderColumn dataField="flag" />
                    <TableHeaderColumn isKey dataField="title" dataSort>
                      Title
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="subtitle" dataSort>
                      Subtitle
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="idec" dataSort>
                      IDEC
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="folder" dataSort>
                      Folder
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="gener" dataSort>
                      Genre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="duration" dataSort>
                      Duration
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="created" dataSort>
                      Created
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="modified" dataSort>
                      Modified
                    </TableHeaderColumn>
                  </BootstrapTable>
                  </TabPane>
                  <TabPane tabId="3">
                  <Row>
                    <Col xs="12">
                      <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
                        <Card>
                          <CardHeader>
                            <i color="link" className="card-header-action btn-minimize" data-target="#collapseExample" onClick={this.toggle}>Form Elements</i>
                          </CardHeader>
                          <Collapse isOpen={this.state.collapse} id="collapseExample">
                            <CardBody>
                              <Form className="form-horizontal">
                                <FormGroup>
                                  <Label htmlFor="prependedInput">Prepended text</Label>
                                  <div className="controls">
                                    <InputGroup className="input-prepend">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>@</InputGroupText>
                                      </InputGroupAddon>
                                      <Input id="prependedInput" size="16" type="text" />
                                    </InputGroup>
                                    <p className="help-block">Here's some help text</p>
                                  </div>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="appendedInput">Appended text</Label>
                                  <div className="controls">
                                    <InputGroup>
                                      <Input id="appendedInput" size="16" type="text" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>.00</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                    <span className="help-block">Here's more help text</span>
                                  </div>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="appendedPrependedInput">Append and prepend</Label>
                                  <div className="controls">
                                    <InputGroup className="input-prepend">
                                      <InputGroupAddon addonType="prepend">
                                        <InputGroupText>$</InputGroupText>
                                      </InputGroupAddon>
                                      <Input id="appendedPrependedInput" size="16" type="text" />
                                      <InputGroupAddon addonType="append">
                                        <InputGroupText>.00</InputGroupText>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </div>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="appendedInputButton">Append with button</Label>
                                  <div className="controls">
                                    <InputGroup>
                                      <Input id="appendedInputButton" size="16" type="text" />
                                      <InputGroupAddon addonType="append">
                                        <Button color="secondary">Go!</Button>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </div>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="appendedInputButtons">Two-button append</Label>
                                  <div className="controls">
                                    <InputGroup>
                                      <Input id="appendedInputButtons" size="16" type="text" />
                                      <InputGroupAddon addonType="append">
                                        <Button color="secondary">Search</Button>
                                        <Button color="secondary">Options</Button>
                                      </InputGroupAddon>
                                    </InputGroup>
                                  </div>
                                </FormGroup>
                                <div className="form-actions">
                                  <Button type="submit" color="primary">Save changes</Button>
                                  <Button color="secondary">Cancel</Button>
                                </div>
                              </Form>
                            </CardBody>
                          </Collapse>
                        </Card>
                      </Fade>
                    </Col>
                  </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    4. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </TabPane>
                  <TabPane tabId="5">
                    5. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </TabPane>
                  <TabPane tabId="6">
                    6. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </TabPane>
                  <TabPane tabId="7">
                    7. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </TabPane>
                  <TabPane tabId="8">
                    8. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Copy;
