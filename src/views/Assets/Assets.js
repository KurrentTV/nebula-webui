import React, { Component } from 'react';
import { Badge, Button, ButtonGroup, ButtonToolbar, Col, Collapse, FormGroup, Input, InputGroup, InputGroupAddon, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import data from './_data';
// React select
import displayoptions from './display-options';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import NebulaApi from '../../utils/api/NebulaApi';

const options = displayoptions.DOPTIONS;

class Assets extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'Main',
      items: [],
      isLoaded: false,
      tableItems: false
    };

    this.MainTable = data.rows;
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: true,
      withFirstAndLast: false,
    };
  }

  componentDidMount() {
    const data = { object_type: 'asset', id_view: 1 }

      NebulaApi.getAssets(data).then(res => {
        this.setState({
          items: res.data,
          isLoaded: true
        })}
       ).catch( err => {
        console.error(err)
      })
  }
  
  
  
  showOptions = (_showHide) => {
  	this.setState({
        tableItems: _showHide
      });
  }

  toggle = (tab) => {
   
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        tableItems: false
      });

      let viewType = 1;
      switch (tab) {
        case "Main":
          viewType = 1;
          break;
        case "Fill":
          viewType = 2;
          break;
        case "Music":
          viewType = 3;
          break;
        case "Stories":
          viewType = 4;
          break;
        case "Commercial":
          viewType = 5;
          break;
        case "Incoming":
          viewType = 13;
          break;
        case "Archive":
          viewType = 12;
          break;
        case "Trash":
          viewType = 11;
          break;
        default:
          viewType = 1;
      }

      const data = { object_type: "asset", id_view: viewType };
      NebulaApi.getAssets(data).then(
        response => {
          this.setState({
            items: response.data,
            isLoaded: true
          });
        },
        error => {
          console.log(error);
        }
      );
    }
      
  }

  render() {
  	var {activeTab,items,isLoaded,tableItems} = this.state;
  	
  	
  	let formItems;
  	if(tableItems===true){
  		
  		formItems = (
  			 <FormGroup>
                <Select
                  name="form-field-name2"
                  value={this.state.value}
                  options={options}
                  onChange={this.saveChanges}
                  multi
                />
              </FormGroup>
  		);
	}

    return (
      <div className="animated fadeIn">
      <div className="card">
        <div className="card-body">
        <Row>
          <Col xs="12" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Main' })}
                  onClick={() => { this.toggle('Main'); }}
                >
                  Main
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Fill' })}
                  onClick={() => { this.toggle('Fill'); }}
                >
                  Fill
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Music' })}
                  onClick={() => { this.toggle('Music'); }}
                >
                  Music
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Stories' })}
                  onClick={() => { this.toggle('Stories'); }}
                >
                  Stories
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Commercial' })}
                  onClick={() => { this.toggle('Commercial'); }}
                >
                  Commercial
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Incoming' })}
                  onClick={() => { this.toggle('Incoming'); }}
                >
                  Incoming
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Archive' })}
                  onClick={() => { this.toggle('Archive'); }}
                >
                  Archive
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'Trash' })}
                  onClick={() => { this.toggle('Trash'); }}
                >
                  Trash
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="Main">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
             {formItems}
              </Col>
              </Row>

              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Fill">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
              {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                 <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Music">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
              {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                 <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Stories">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
              {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Commercial">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
              {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                 <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Incoming">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
              {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                 <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Archive">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
              {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
              </TabPane>
              <TabPane tabId="Trash">
              <Row>
              <Col sm="4" className="d-none d-sm-inline-block">
                <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                  <ButtonGroup className="mr-3" aria-label="First group">
                    <Button color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button color="outline-secondary"><i className="fa fa-th-large"></i></Button>
                    <Button onClick={() => { this.showOptions(true); }} color="outline-secondary"><i className="fa fa-gear"></i></Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Col>
              <Col sm="4" className="d-none d-sm-inline-block">
                <Button color="primary" className="float-left"><i className="fa fa-plus"></i> Add New Asset</Button>
              </Col>
              <Col md="4">
              <FormGroup className="float-right">
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                  <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="btn btn-outline-dark btn-block"><i className="fa fa-times"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              </Col>
              <Col md="4">
             {formItems}
              </Col>
              </Row>
              <BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
                
                <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
                <TableHeaderColumn dataField="idec" dataSort>IDEC</TableHeaderColumn>
                <TableHeaderColumn dataField="id_folder" dataSort>Folder</TableHeaderColumn>
                <TableHeaderColumn dataField="gener" dataSort>Genre</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Duration</TableHeaderColumn>
                <TableHeaderColumn dataField="ctime" dataSort>Created</TableHeaderColumn>
                <TableHeaderColumn dataField="mtime" dataSort>Modified</TableHeaderColumn>
              </BootstrapTable>
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

export default Assets;
