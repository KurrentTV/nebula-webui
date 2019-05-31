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
    this.showLayout = this.showLayout.bind(this);
    this.state = {
      activeTab: 'Main',
      items: [],
      isLoaded: false,
      tableItems: false,
      layout: 'List'
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
	
  subTitleFormat(cell){  
  	if(cell === "" || cell == 'undefined' || cell == null) 
  	return "-";
  	else return cell;
  		
  }
  folderName(cell){  
  
  	let folder = '';
  	 if(cell != '')
  	 {
	 	switch(cell)
	 	{
			case 1:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#20a8d8'}}> Movie </span>
			break;
			case 2:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#6610f2'}}> Serie </span>
			break;
			case 3:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#6f42c1'}}> Story </span>
			break;
			case 4:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#e83e8c'}}> Song </span>
			break;
			case 5:
			folder= <span className='badge' style={{padding:'5px',color:'#000',background:'#f86c6b'}}> Fill </span>
			break;
			case 6:
			folder= <span className='badge' style={{padding:'5px',color:'#fff',background:'#A30E02'}}> Trailer </span>
			break;
			case 7:
			folder= <span className='badge' style={{padding:'5px',color:'#000',background:'#E09C2D'}}> Jingle </span>
			break;
			case 8:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#4dbd74'}}> Graphics </span>
			break;
			case 9:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#17a2b8'}}> Commercial </span>
			break;
			case 10:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#73818f'}}> Teleshopping </span>
			break;
			case 11:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#2f353a'}}> Dataset </span>
			break;
			case 12:
			folder= <span className='badge' style={{padding:'5px',color:'#eee',background:'#F63C3A'}}> Incoming </span>
			break;
		}
	 }
	 return folder;
  }
  secondsToHms(d){  	
  	if(d !== "" && d !== undefined)
  	{
	   const fps = 25;
	   const pad2 = txt => ( '0' + Math.floor( txt ) ).substr( -2 ),
	         h = pad2( d / 3600 ),
	         m = pad2( d % 3600 / 60 ),
	         s = pad2( d % 60 ),
	         f = pad2( d % 1 * fps ); // +1 here for one based frame
	   return `${h}:${m}:${s}:${f}`;	
	}
	else 
		return '00:00:00.00';
  	
	}
  formatTime(cell){
  	var date = new Date(cell*1000);  
  	var d = date.getDay();
  	var m = date.getMonth();
  	var y = date.getFullYear();
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();
	var formattedTime = y + '-' + m + '-' + d + ' ' + hours + ':' + minutes.substr(-2);
	return formattedTime;
  }
  componentDidMount() {
    const data = { object_type: 'asset', id_view:1};  
      NebulaApi.getAssets(data).then(res => {      	     	
        this.setState({
          items: res.data,
          isLoaded: true
        })}
       ).catch( err => {
        console.error(err)
      })
  }  
  showLayout = (_layout) => {
  	this.setState({
        layout: _layout
      });
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
        tableItems: false,
        isLoaded: false
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
  	var foldetStyle = {
		padding:'5px',
		color: 'eee'
	}
  	var {activeTab,items,isLoaded,tableItems,layout} = this.state;  	
  	let formItems;let _tableData;
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
	if(isLoaded === true)
	{
		 var style = { 
	        width:'100%'
	    };
	    var stImg = {
			position:'absolute',
			top:'50%',
			left:'50%',
			fontSize:'50px',
			margin:'-25px 0px 0px -20px'
		}
		if(layout == 'List')
		{
			_tableData = (
			<BootstrapTable data={items.data} version="4" striped hover pagination options={this.options}>
	            <TableHeaderColumn isKey dataField="title" dataSort>Title</TableHeaderColumn>
	             <TableHeaderColumn dataField="subtitle" dataFormat={ this.subTitleFormat } dataSort>Sub Title</TableHeaderColumn>
	            <TableHeaderColumn dataField="idec" dataFormat={ this.subTitleFormat } dataSort>IDEC</TableHeaderColumn>
	            <TableHeaderColumn dataField="id_folder" dataSort dataFormat={this.folderName}>Folder</TableHeaderColumn>
	            <TableHeaderColumn dataField="gener" dataFormat={ this.subTitleFormat } dataSort>Genre</TableHeaderColumn>
	            <TableHeaderColumn dataField="duration" dataSort dataFormat={this.secondsToHms}>Duration</TableHeaderColumn>
	            <TableHeaderColumn dataField="ctime" dataFormat={ this.formatTime } dataSort>Created</TableHeaderColumn>
	            <TableHeaderColumn dataField="mtime" dataFormat={ this.formatTime } dataSort>Modified</TableHeaderColumn>
	          </BootstrapTable>
			);
		}
		else if(layout == 'Grid')
		{
			_tableData = (			
			<div className="react-bs-table-container" style={{overflow:'hidden',border:'1px solid #23282c',paddingTop:'1rem'}} id="app-card-list">		        
	        	  {items.data.map(item =>(
	        	  		 <article key={item.id} className="card-grid">		
						    <div style={{position:'relative'}} className="card-grid-header">	
						    	<img style={style} src="/assets/img/hqdefault.jpg" alt="boohoo" className="img-responsive"/>
						    	<i style={stImg} className="fa fa-play-circle"></i>					        
						    </div>
						    <div className="card-grid-body">
						     <h4 className="card-grid-title">{this.subTitleFormat(item.title)}</h4>	
						     <i className="fa fa-circle text-success"></i>
						     <span> </span>
						     	<i className="fa fa-flag text-danger"></i>
						     	<span> </span>
						       {this.folderName(item.id_folder)} 
						       <span> </span>
						       <button style={{background:'rgba(0, 0, 0, 0)'}} className="badge badge-block btn-outline-secondary" disabled="">{this.secondsToHms(item.duration)}</button>
						       <span> </span>
						       <button style={{background:'rgba(0, 0, 0, 0)'}} className="badge badge-block btn-outline-secondary" disabled="">{this.formatTime(item.ctime)}</button>
						       <span> </span>
						       <button style={{background:'rgba(0, 0, 0, 0)'}} className="badge badge-block btn-outline-secondary" disabled="">{this.formatTime(item.mtime)}</button>			
						        
						    </div>
	        	  		 </article>	                           
                    ))}
		    </div>		
		
			);
		}		
	}
	else
	{
		_tableData = ( <div> Loading....</div>);
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
                    <Button onClick={() => { this.showLayout('List'); }} color="outline-secondary"><i className="fa fa-th-list"></i></Button>
                    <Button onClick={() => { this.showLayout('Grid'); }} color="outline-secondary"><i className="fa fa-th-large"></i></Button>
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
              {_tableData}
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
              {_tableData}
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
              {_tableData}
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
              {_tableData}
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
              {_tableData}
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
              {_tableData}
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
              {_tableData}
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
              {_tableData}
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
