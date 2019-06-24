import React, { Component } from 'react';
import { find } from 'lodash';
import {Button, Progress, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, ButtonGroup} from 'reactstrap';
import classnames from 'classnames';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import NebulaApi from '../../utils/api/NebulaApi';

class Jobs extends Component {

  constructor(props) {
    super(props);

    this.getJobTitle = this.getJobTitle.bind(this);
    this.handleAbort = this.handleAbort.bind(this);
    this.handleReload = this.handleReload.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: 'Active',
      items: [],
      assets: [],
      assetCount: 0,
      assetCountStatus: false,
      isLoaded: false,
      tableItems: false,
      search: '',
      selectedOption: [],
    };

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
    const assets = { object_type: 'asset'};
    const data = { view: 'active'};
    NebulaApi.getAssets(assets).then(res => {
      this.setState({
        assetCount: res.data.count,
        assetCountStatus: true,
        assets: res.data && res.data.data || []
      })}
    ).catch( err => {
      console.error(err)
    });
    NebulaApi.getLatestJobs(data).then(res => {

      var arr = [];
      arr.push(res.data.data);
      this.setState({
        items: arr,
        isLoaded: true
      })}
    ).catch( err => {
      console.error(err)
    })

  }
  handleReload(id) {
    const data = {restart: [id]};
    NebulaApi.getLatestJobs(data).then(res => {
      console.log('Reloaded', res)
    }).catch( err => {
      console.error(err)
    })
    console.log('handleReload', id);
  }
  handleAbort(id) {
    const data = {abort: [id]};
    NebulaApi.getLatestJobs(data).then(res => {
      console.log('Aborted', res)
    }).catch( err => {
      console.error(err)
    })
  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        tableItems: false,
        isLoaded: false
      });

      let viewType = 'active';
      switch (tab) {
        case "Active":
          viewType = 'active';
          break;
        case "Finished":
          viewType = 'finished';
          break;
        case "Failed":
          viewType = 'failed';
          break;
        default:
          viewType = 'active';
      }

      const data = { view: viewType };
      NebulaApi.getLatestJobs(data).then(
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
  getJobTitle = (assets) => (cell) => {
    const asset = find(assets, (item) => item.id === cell);
    return asset ? asset.title: cell;
  }
  jobAction(cell)
  {
    return 'Proxy';
  }
  actions = (actionReload, actionAbort) => (cell, row) => {
    return (
      <ButtonGroup className="mr-3" aria-label="First group">
        <Button color="success" className="float-right" onClick={() => this.handleReload(cell)}><i className="icon-refresh icons"></i></Button>
        <Button color="danger" className="float-right" onClick={() => this.handleAbort(cell)}><i className="fa fa-times"></i></Button>
      </ButtonGroup>
    )
  }
  progress(cell)
  {
    return (
      <div>
        <strong>({cell}%)</strong>
        <Progress className="progress-xs mt-2" color="success" value={cell} />
      </div>
    )
  }
  render() {
    var {activeTab,items,isLoaded,tableItems, assets} = this.state;
    let _tableData;
    if(tableItems===true){

    }
    if(isLoaded === true)
    {
      let finalItems = items[0]

      _tableData = (
        <BootstrapTable data={finalItems} version="4" style={{border:'1px solid #23282c'}} striped hover pagination options={this.options} className="jobsTable">
          <TableHeaderColumn isKey dataField="id" dataFormat={ this.getJobTitle(assets) } width={'200px'}>Title</TableHeaderColumn>
          <TableHeaderColumn dataField="id_action" dataFormat={ this.jobAction }>Action</TableHeaderColumn>
          <TableHeaderColumn dataField="ctime" dataFormat={ this.formatTime }>Created</TableHeaderColumn>
          <TableHeaderColumn dataField="stime" dataFormat={this.formatTime}>Started</TableHeaderColumn>
          <TableHeaderColumn dataField="etime" dataFormat={ this.formatTime }>Finished</TableHeaderColumn>
          <TableHeaderColumn dataField="progress" dataFormat={this.progress} thStyle={{whiteSpace: 'nowrap', textOverflow: 'unset'}}>Progress Bar</TableHeaderColumn>
          <TableHeaderColumn dataField="message" width={'350px'}>Message</TableHeaderColumn>
          <TableHeaderColumn dataField="id" dataFormat={this.actions(this.handleReload, this.handleAbort)} tdStyle={{textOverflow: 'unset'}}>Actions</TableHeaderColumn>
        </BootstrapTable>
      );
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
                      className={classnames({ active: this.state.activeTab === 'Active' })}
                      onClick={() => { this.toggle('Active'); }}
                    >
                      Active
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'Finished' })}
                      onClick={() => { this.toggle('Finished'); }}
                    >
                      Finished
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 'Failed' })}
                      onClick={() => { this.toggle('Failed'); }}
                    >
                      Failed
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="Active">
                    {_tableData}
                  </TabPane>
                  <TabPane tabId="Finished">
                    {_tableData}
                  </TabPane>
                  <TabPane tabId="Failed">
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


export default Jobs;
