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
import classnames from "classnames";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

// React select
import displayoptions from "./display-options";
import Select from "react-select";
import "react-select/dist/react-select.min.css";

import data from "./_data";
import NebulaApi from "../../utils/api/NebulaApi";

const options = displayoptions.DOPTIONS;

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
                  <TabPane tabId="2">
                    2. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </TabPane>
                  <TabPane tabId="3">
                    3. Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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
