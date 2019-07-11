import React, { Component } from 'react';
import { filter, map, isEmpty, find, forEach } from 'lodash';
import { Badge, Button, ButtonGroup, ButtonToolbar, Col, Collapse, FormGroup, Input, InputGroup, InputGroupAddon, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';
import {Card, CardHeader, CardBody} from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import data from './_data';
// React select
import displayoptions from './display-options';
import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import NebulaApi from '../../utils/api/NebulaApi';
import {Link} from "react-router-dom";
import {KURRENTTV_BASE_URL} from "../../utils/Constants";
import CookiesHelper from '../../utils/CookiesHelper';

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
      layout: 'List',
      search: '',
      selectedOption: [],
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
  titleFormat(cell, row){
  	if(cell === "" || cell == 'undefined' || cell == null)
  	return "-";
    else return <Link to={`/asset/${row.id}`}>{cell}</Link>;
  }
  assetStatusFlag(cell){
  	if(cell === 1) 
  	return <i className='fa fa-circle text-success' />
  	else return <i className='fa fa-circle text-disabled' />
  		
  }
  folderName = (assetFolders) => (cell) => {
  
  let folder = '';
  if(cell != '')
  {
		let folderItem = null;
    forEach(assetFolders, (folder, index) => {
      if (Number(index) === cell) {
        folderItem = folder;
      }
    });
    if (folderItem) {
      folder= <span className='badge' style={{padding:'5px',color:'#eee',background: `#${folderItem.color.toString(16)}`}}> {folderItem.title} </span>
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
    const optionsCookie = CookiesHelper.getCookie('assetOptions') || [];
    const assetViews = localStorage.getItem('assetViews') ? JSON.parse(localStorage.getItem('assetViews')) || {} : {};
    const assetFolders = localStorage.getItem('assetFolders') ? JSON.parse(localStorage.getItem('assetFolders')) || {} : {};
    const metaTypes = localStorage.getItem('metaTypes') ? JSON.parse(localStorage.getItem('metaTypes')) || {} : {};
    this.setState({ selectedOptions: optionsCookie });
    let data = { object_type: 'asset', id_view:1};
    NebulaApi.getAssets(data).then(res => {

      var arr = [];
      arr.push(res.data.data);
      this.setState({
        items: arr,
        isLoaded: true
      })}
     ).catch( err => {
      console.error(err)
    })
    data = { user: 'demo'};

    if (isEmpty(assetViews) || isEmpty(assetFolders) || isEmpty(metaTypes)) {
      NebulaApi.getSettings(data).then(res => {
          let assetViews = res.data && res.data.data && res.data.data.views || [];
          let assetFolders = res.data && res.data.data && res.data.data.folders || [];
          let metaTypes = res.data && res.data.data && res.data.data.meta_types || [];
          this.setState({
            assetViews, assetFolders, metaTypes
          })
          localStorage.setItem('assetViews', JSON.stringify(assetViews));
          localStorage.setItem('assetFolders', JSON.stringify(assetFolders));
          localStorage.setItem('metaTypes', JSON.stringify(metaTypes));
        }
      ).catch( err => {
        console.error(err)
      })
    } else {
      this.setState({assetViews, assetFolders, metaTypes});
    }

  }  
  showLayout = (_layout) => { 
  	this.setState({
        layout: _layout
      });
  }
  
  showOptions = (_showHide) => {   
  	this.setState({
        tableItems: !this.state.tableItems
      });
  }
  videoCodec(cell){
  	if(cell != "" && cell != null &&  typeof cell !== undefined)
  	{
		return cell.toUpperCase();
	}
	else
	{
		return "";
	}  	
  }
  fpsFormat(cell){
  	if(cell != "" && cell != null &&  typeof cell !== undefined)
  	{
		var fps = cell.split("/");	
		return fps[0];
	}
	else
	{
		return "0";
	}
  }
  bytesToSize(bytes) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }
  toggle = (tab) => {  
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        tableItems: false,
        isLoaded: false
      });

      let viewType = 1;

      forEach(this.state.assetViews, (view, index) => {
        if (view.title === tab) {
          viewType = parseInt(index);
        }
      });
      const data = { object_type: "asset", id_view: viewType };
      NebulaApi.getAssets(data).then(
        response => {
        	var arr = [];
          arr.push(response.data.data);
          this.setState({
            items: arr,
            isLoaded: true
          });
        },
        error => {
          console.log(error);
        }
      );
    }
      
  }
  changeSearch = (event) => {
    this.setState({search: event.target.value})
  }
  applySearch = () => {
    this.setState({finalSearch: this.state.search})
  }
  resetSearch = () => {
    this.setState({search: '', finalSearch: ''})
  }
  saveChanges = (selectedOptions) => {
    // cookie.save('assetOptions', selectedOptions);
    CookiesHelper.setCookie('assetOptions', selectedOptions)
    this.setState({ selectedOptions });
  }

  render() {
  	var foldetStyle = {
      padding:'5px',
      color: 'eee'
    }
    var {activeTab,items,isLoaded,tableItems,layout,search,finalSearch,selectedOptions, assetFolders, assetViews,metaTypes } = this.state;
    let formItems;
    let _tableData;
    const currentView = find(assetViews, view => view.title === activeTab)
    const columns = currentView && currentView.columns || []

    if(tableItems===true){

      formItems = (
        <FormGroup>
          <Select
            name="form-field-name2"
            value={selectedOptions}
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
      let finalItems = items[0]

      if (finalSearch) {
        finalItems = filter(items[0], obj => obj.title.indexOf(finalSearch) > -1);
      }

      if(layout == 'List')
      {
        _tableData = (
        <BootstrapTable data={finalItems} version="4" style={{border:'1px solid #23282c'}} striped hover pagination options={this.options} className="assetTable">
          {map(columns, (column, index) => {
            const title = metaTypes && metaTypes[column] && metaTypes[column].aliases && metaTypes[column].aliases.en && metaTypes[column].aliases.en[0] || ''
            const dataType = metaTypes && metaTypes[column] && metaTypes[column].class || 0
            let dataFormat = this.titleFormat;
            switch (dataType) {
              case 0: dataFormat = this.subTitleFormat
                break;
              case 1: dataFormat = this.subTitleFormat
                break;
              case 2: dataFormat = this.subTitleFormat
                break;
              case 3: dataFormat = this.subTitleFormat
                break;
              case 4: dataFormat = this.subTitleFormat
                break;
              case 5: dataFormat = this.formatTime
                break;
              case 6: dataFormat = this.secondsToHms
                break;
              case 7: dataFormat = this.subTitleFormat
                break;
              case 8: dataFormat = this.subTitleFormat
                break;
              case 9: dataFormat = this.subTitleFormat
                break;
              case 10: dataFormat = this.subTitleFormat
                break;
              case 11: dataFormat = this.subTitleFormat
                break;
            }
            if (column === 'title') {
              dataFormat = this.titleFormat
            }
            if (column === 'id_folder') {
              dataFormat = this.folderName(assetFolders)
            }
            return (<TableHeaderColumn key={index} isKey={column === 'title'} dataField={column}
                               dataFormat={dataFormat}>{title}</TableHeaderColumn>)
          })
          }
          {map(selectedOptions, (item, index) => (<TableHeaderColumn key={index} dataField={item.field} dataFormat={ this.subTitleFormat }>{item.label}</TableHeaderColumn>))
          }
        </BootstrapTable>
        );
      }
      else if(layout == 'Grid')
      {
        if(finalItems.length > 0)
        {
          _tableData = (
            <div className="card">
              <div className="card-body">
                <div className="row">
                {finalItems.map(item =>(

                    <Col key={item['id']} xl="2" md="4" sm="6" xs="12" className="mb-4">
                      <table className="w-100" style={{tableLayout:'fixed'}}>
                        <tbody>
                          <tr key={item['id']}>
                            <td>
                              <div style={{ position:'relative' }}>
                                <Video
                                  autoPlay={false}
                                  controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                                  poster={`${KURRENTTV_BASE_URL}/thumb/0000/${item['id']}/orig.jpg`}
                                  onCanPlayThrough={() => {
                                    // Do stuff
                                  }}>
                                  <source src={`${KURRENTTV_BASE_URL}/proxy/0000/${item['id']}.mp4`} type="video/webm"/>
                                </Video>
                              </div>
                              <Link to={`/asset/${item['id']}`}><h5>{this.subTitleFormat(item['title'])}</h5></Link>
                                {this.assetStatusFlag(item['status'])}
                                <span>  </span>
                                <i className="fa fa-flag text-danger" />
                                <span>  </span>
                                {this.folderName(item['id_folder'])}
                                <span>  </span>
                                <button className="badge badge-block btn-outline-secondary" disabled>{this.secondsToHms(item['duration'])}</button>
                                <span>  </span>
                                <button className="badge badge-block btn-outline-secondary" disabled>{this.bytesToSize(item['file/size'])}</button>
                                <span>  </span>
                                <button className="badge badge-block btn-outline-secondary" disabled>{this.fpsFormat(item['video/fps'])}FPS</button>
                                <span>  </span>
                                <button className="badge badge-block btn-outline-secondary" disabled>{this.videoCodec(item['video/codec'])}</button>
                                <span>  </span>
                                <button className="badge badge-block btn-outline-secondary" disabled>{item['video/width']}x{item['video/height']}</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Col>

                      ))}
                </div>
              </div>
            </div>

        );
        }
        else
        {
          _tableData = (<div className="row" style={{paddingLeft:'17px'}}>No Record Found!</div>);
        }
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
              {map(assetViews, (view) => view.title !== '-' ? (<NavItem key={view.title}>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === view.title })}
                    onClick={() => { this.toggle(view.title); }}
                  >
                    {view.title}
                  </NavLink>
                </NavItem>) : null
              )}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {map(assetViews, (view) => {
                if (view.title !== '-') {
                  return (<TabPane key={view.title} tabId={view.title}>
                    <Row>
                      <Col sm="4" className="d-none d-sm-inline-block">
                        <ButtonToolbar className="float-left" aria-label="Toolbar with button groups">
                          <ButtonGroup className="mr-3" aria-label="First group">
                            <Button onClick={() => {
                              this.showLayout('List');
                            }} active={layout === 'List'} color="outline-secondary"><i
                              className="fa fa-th-list"></i></Button>
                            <Button onClick={() => {
                              this.showLayout('Grid');
                            }} active={layout === 'Grid'} color="outline-secondary"><i
                              className="fa fa-th-large"></i></Button>
                            <Button onClick={() => {
                              this.showOptions(true);
                            }} color="outline-secondary"><i className="fa fa-cog"></i></Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </Col>
                      <Col sm="4" className="d-none d-sm-inline-block">
                        <Link to="/asset/add"><Button color="primary" className="float-left"><i
                          className="fa fa-plus"></i> Add New Asset</Button></Link>
                      </Col>
                      <Col md="4">
                        <FormGroup className="float-right">
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <Button type="button" color="btn btn-outline-dark btn-block" onClick={this.applySearch}><i
                                className="fa fa-search"></i></Button>
                            </InputGroupAddon>
                            <Input type="text" id="input3-group2" name="input3-group2" placeholder="Search"
                                   value={search} onChange={this.changeSearch}/>
                            <InputGroupAddon addonType="append">
                              <Button type="button" color="btn btn-outline-dark btn-block" onClick={this.resetSearch}><i
                                className="fa fa-times"></i></Button>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        {formItems}
                      </Col>
                    </Row>
                    {_tableData}
                  </TabPane>)
                }
              })}
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
