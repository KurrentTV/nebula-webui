import React, { Component } from 'react';
import { Col, Row, Progress } from 'reactstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import NebulaApi from '../../utils/api/NebulaApi';

class Jobs extends Component {

  constructor(props) {
    super(props);

    this.getJobTitle = this.getJobTitle.bind(this);
    this.state = {
      items: [],
      isLoaded: false,
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
  getJobTitle(cell){
    return cell;
  }
  jobAction(cell)
  {
    return 'Proxy';
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
    const data = { view:'finished'};
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

  render() {
    var foldetStyle = {
      padding:'5px',
      color: 'eee'
    }
    var {items,isLoaded,finalSearch} = this.state;
    let _tableData;
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


      _tableData = (
        <BootstrapTable data={finalItems} version="4" style={{border:'1px solid #23282c'}} striped hover pagination options={this.options} className="jobsTable">
          <TableHeaderColumn isKey dataField="id" dataFormat={ this.getJobTitle } width={'50px'}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField="id_action" dataFormat={ this.jobAction }>Action</TableHeaderColumn>
          <TableHeaderColumn dataField="ctime" dataFormat={ this.formatTime }>Created</TableHeaderColumn>
          <TableHeaderColumn dataField="stime" dataFormat={this.formatTime}>Started</TableHeaderColumn>
          <TableHeaderColumn dataField="etime" dataFormat={ this.formatTime }>Finished</TableHeaderColumn>
          <TableHeaderColumn dataField="progress" dataFormat={this.secondsToHms}>Progress</TableHeaderColumn>
          <TableHeaderColumn dataField="message" width={'450px'}>Message</TableHeaderColumn>
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
                {_tableData}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}


export default Jobs;
