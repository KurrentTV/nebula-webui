import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
import NebulaApi from '../../utils/api/NebulaApi';
/*import * from '../../utils/netdata/lib';
import * from '../../utils/netdata/css';
import * from '../../utils/netdata/images';*/

import axios from "axios";
const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')

// Card Chart 1
const cardChartData1 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)',
      data: [65, 59, 84, 84, 51, 55, 40],
    },
  ],
};

const cardChartOpts1 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData1.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData1.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  }
}


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 18, 9, 17, 34, 22, 11],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 4
const cardChartData4 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.3)',
      borderColor: 'transparent',
      data: [78, 81, 80, 45, 34, 12, 40, 75, 34, 89, 32, 68, 54, 72, 18, 98],
    },
  ],
};

const cardChartOpts4 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
        barPercentage: 0.6,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
};

// Social Box Chart
const socialBoxData = [
  { data: [65, 59, 84, 84, 51, 55, 40], label: 'facebook' },
  { data: [1, 13, 9, 17, 34, 41, 38], label: 'twitter' },
  { data: [78, 81, 80, 45, 34, 12, 40], label: 'linkedin' },
  { data: [35, 23, 56, 22, 97, 23, 64], label: 'google' },
];

const makeSocialBoxData = (dataSetNo) => {
  const dataset = socialBoxData[dataSetNo];
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        backgroundColor: 'rgba(255,255,255,.1)',
        borderColor: 'rgba(255,255,255,.55)',
        pointHoverBackgroundColor: '#fff',
        borderWidth: 2,
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const socialChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

// sparkline charts
const sparkLineChartData = [
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'New Clients',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Recurring Clients',
  },
  {
    data: [35, 23, 56, 22, 97, 23, 64],
    label: 'Pageviews',
  },
  {
    data: [65, 59, 84, 84, 51, 55, 40],
    label: 'Organic',
  },
  {
    data: [78, 81, 80, 45, 34, 12, 40],
    label: 'CTR',
  },
  {
    data: [1, 13, 9, 17, 34, 41, 38],
    label: 'Bounce Rate',
  },
];

const makeSparkLineData = (dataSetNo, variant) => {
  const dataset = sparkLineChartData[dataSetNo];
  const data = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        backgroundColor: 'transparent',
        borderColor: variant ? variant : '#c2cfd6',
        data: dataset.data,
        label: dataset.label,
      },
    ],
  };
  return () => data;
};

const sparklineChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}

const mainChart = {
  labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: hexToRgba(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1,
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2,
    },
    {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5],
      data: data3,
    },
  ],
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: 'index',
    position: 'nearest',
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
      }
    }
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false,
        },
      }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250,
        },
      }],
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
 	this.showCharts = this.showCharts.bind(this);
 	this.getJobTitle = this.getJobTitle.bind(this);
    this.state = {
      assets: [],
      latestJobs: false,
      latestJobItems: [],
      dropdownOpen: false,
      radioSelected: 2,
      assetCountStatus: false,
      assetCount: 0,
      itemsCountStatus: false,
      itemsCount: 0,
      binCountStatus: false,
      binCounts: 0,
      eventsCountStatus: false,
      eventsCount: 0,
      hideSystem: false,
      hideCPU: true,
      hideMemory: true,
      hideDisk: true,
      hideNetwork: true,
      hideService: true
      
    };
  }
  NetDataHost = "kurrenttv.nbla.cloud:19999";
  componentDidMount() {
  	var that = this;
  	const data = { object_type: 'asset'};  
  	const itemsdata = { object_type: 'item'};
  	const bindata = { object_type: 'bin'};
  	const eventsdata = { object_type: 'event'};
  	const jobs = {view:'finished'}
  	NebulaApi.getAssets(data).then(res => {      	     	
        this.setState({
          assetCount: res.data.count,
          assetCountStatus: true,
          assets: res.data
        })}
       ).catch( err => {
        console.error(err)
      });
      
      NebulaApi.getLatestJobs(jobs).then(res => {      	     	
        this.setState({
          latestJobItems: res.data,
          latestJobs: true
        })}
       ).catch( err => {
        console.error(err)
      });
      
      /* set items count */
      /*
      NebulaApi.getAssets(bindata).then(res => {      	     	
        this.setState({
          itemsCount: res,
          itemsCountStatus: true
        })}
       ).catch( err => {
        console.error(err)
      });
       /* set bin count */
      
     /* NebulaApi.getAssets(bindata).then(res => {      	     	
        this.setState({
          binCounts: res.data.count,
          binCountStatus: true
        })}
       ).catch( err => {
        console.error(err)
      });
       /* set event count */
      /*
      NebulaApi.getAssets(eventsdata).then(res => {      	     	
        this.setState({
          eventsCount: res.data.count,
          eventsCountStatus: true
        })}
       ).catch( err => {
        console.error(err)
      });*/
  }
  getJobTitle(cell){
  	var {assetCountStatus, assetCount, itemsCountStatus, itemsCount, binCountStatus, binCounts, eventsCountStatus, eventsCount,hideSystem ,hideCPU ,hideMemory ,
      hideDisk,hideNetwork,hideService, latestJobs, latestJobItems,assets} = this.state; 
     var _title = '';
  	 if(assetCountStatus == true)
  	 {  	 	
      const items = assets.data.map((item, key) =>{
      		  if(key == cell) {_title = item.title;}
      		}
	    );
	 }
	 return _title;	
  } 
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
   showCharts(_type) {
	switch(_type)
	{
		case "System":
   		this.setState({
	      hideSystem: false,
	      hideCPU: true,
	      hideMemory: true,
	      hideDisk: true,
	      hideNetwork: true,
	      hideService: true,
	    });	
		break;
		case "CPU":	
		this.setState({
	      hideSystem: true,
	      hideCPU: false,
	      hideMemory: true,
	      hideDisk: true,
	      hideNetwork: true,
	      hideService: true,
	    });	
		break;
		case "Memory":	
		this.setState({
	      hideSystem: true,
	      hideCPU: true,
	      hideMemory: false,
	      hideDisk: true,
	      hideNetwork: true,
	      hideService: true,
	    });	
		break;
		case "Disk":
		this.setState({
	      hideSystem: true,
	      hideCPU: true,
	      hideMemory: true,
	      hideDisk: false,
	      hideNetwork: true,
	      hideService: true,
	    });			
		break;
		case "Network":		
		this.setState({
	      hideSystem: true,
	      hideCPU: true,
	      hideMemory: true,
	      hideDisk: true,
	      hideNetwork: false,
	      hideService: true,
	    });
		break;
		case "Service":		
		this.setState({
	      hideSystem: true,
	      hideCPU: true,
	      hideMemory: true,
	      hideDisk: true,
	      hideNetwork: true,
	      hideService: false,
	    });
		break;
	}
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
  jobAction(cell)
  {
  	return 'Proxy';
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
  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
	var {assetCountStatus, assetCount, itemsCountStatus, itemsCount, binCountStatus, binCounts, eventsCountStatus, eventsCount,hideSystem ,hideCPU ,hideMemory ,
      hideDisk,hideNetwork,hideService, latestJobs, latestJobItems,assets} = this.state;
	let _latestJobs;
	var netdataStyle = {
		marginRight:'10px',
		width:'11%',
		willchange: 'transform'
	}
	var btnStyle = {
		background:'#3A4149',
		border:'none',
		color:'#73818f'
	}
	if(latestJobs == true)
	{
		_latestJobs = (
			<BootstrapTable data={latestJobItems.data} version="4" striped hover pagination options={this.options}>
	            <TableHeaderColumn isKey dataField="id" dataFormat={ this.getJobTitle } dataSort>Asset Title</TableHeaderColumn>
	             <TableHeaderColumn dataField="id_action" dataFormat={ this.jobAction } >Action</TableHeaderColumn>	            
	            <TableHeaderColumn dataField="ctime" dataFormat={ this.formatTime }>Created</TableHeaderColumn>
	            <TableHeaderColumn dataField="stime" dataFormat={ this.formatTime }>Start Time</TableHeaderColumn>
	            <TableHeaderColumn dataField="etime" dataFormat={ this.formatTime }>End Time</TableHeaderColumn>
	            <TableHeaderColumn dataField="progress" dataFormat={this.progress}>Progress</TableHeaderColumn>
	            <TableHeaderColumn dataField="message">Message</TableHeaderColumn>
	          </BootstrapTable>
			);
	}
	else{
		_latestJobs =  ( <div> Loading....</div>);
	}
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card1' isOpen={this.state.card1} toggle={() => { this.setState({ card1: !this.state.card1 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem disabled>Disabled action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">{assetCount}</div>
                <div>Assets</div>
                <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                  <Line data={cardChartData2} options={cardChartOpts2} height={70} />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card2' isOpen={this.state.card2} toggle={() => { this.setState({ card2: !this.state.card2 }); }}>
                    <DropdownToggle className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">{itemsCount}</div>
                <div>Items</div>
                <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                  <Line data={cardChartData1} options={cardChartOpts1} height={70} />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <Dropdown id='card3' isOpen={this.state.card3} toggle={() => { this.setState({ card3: !this.state.card3 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </ButtonGroup>
                <div className="text-value">{binCounts}</div>
                <div>Bins</div>
              </CardBody>
              <div className="chart-wrapper mt-3" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  <ButtonDropdown id='card4' isOpen={this.state.card4} toggle={() => { this.setState({ card4: !this.state.card4 }); }}>
                    <DropdownToggle caret className="p-0" color="transparent">
                      <i className="icon-settings"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Action</DropdownItem>
                      <DropdownItem>Another action</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </ButtonGroup>
                <div className="text-value">{eventsCount}</div>
                <div>Events</div>
              </CardBody>
              <div className="chart-wrapper mt-3 mx-3" style={{ height: '70px' }}>
                <Bar data={cardChartData4} options={cardChartOpts4} height={70} />
              </div>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardHeader>
                Latest Jobs
              </CardHeader>
              <CardBody>
                {_latestJobs}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Traffic</CardTitle>
                    <div className="small text-muted">May 2019</div>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                      <ButtonGroup className="mr-3" aria-label="First group">
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                  <Line data={mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Assets</div>
                    <strong>42 (40%)</strong>
                    <Progress className="progress-xs mt-2" color="success" value="40" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Items</div>
                    <strong>6 (20%)</strong>
                    <Progress className="progress-xs mt-2" color="info" value="20" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Bins</div>
                    <strong>2 (60%)</strong>
                    <Progress className="progress-xs mt-2" color="warning" value="60" />
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Events</div>
                    <strong>2 (80%)</strong>
                    <Progress className="progress-xs mt-2" color="danger" value="80" />
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
        <Col>
          <Card>
            <CardBody>
              <Row>              	
                <Col sm="2">
                  <CardTitle className="mb-0"><button onClick={() => { this.showCharts('System'); }} className="btn btn-secondary" style={btnStyle}>System</button></CardTitle>
                  <div className="small text-muted">Overview of the key system metrics.</div>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0"><button onClick={() => { this.showCharts('CPU'); }} className="btn btn-secondary" style={btnStyle}>CPUs</button></CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0"><button onClick={() => { this.showCharts('Memory'); }} className="btn btn-secondary" style={btnStyle}>Memory</button></CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0"><button onClick={() => { this.showCharts('Disk'); }} className="btn btn-secondary" style={btnStyle}>Disks</button></CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0"><button onClick={() => { this.showCharts('Network'); }} className="btn btn-secondary" style={btnStyle}>Networking Stack</button></CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0"><button onClick={() => { this.showCharts('Service'); }} className="btn btn-secondary" style={btnStyle}>Services</button></CardTitle>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Row className="text-center">
              	<div style={{width:'100%',maxHeight:'calc(100% - 15px)',textAlign:'center', display:'inline-block'}}>
					<div style={{width:'100%', height:'100%', align:'center'}} className={hideSystem ? 'hidden' : ''}>	                
		               <div className="netdata-container-easypiechart" style={{marginRight:'11px'}} data-netdata="system.io" data-host={this.NetDataHost} 
		               		data-dimensions="in"
						    data-chart-library="easypiechart"
						    data-title="Disk Read"
						    data-width="10%"
						    data-before="0"
						    data-after="-420"
						    data-points="420"
						    data-common-units="system.io.mainhead"
						    role="application">
						</div>
						<div className="netdata-container-easypiechart" style={{marginRight:'11px'}} data-netdata="system.io" data-host={this.NetDataHost}
						    data-dimensions="out"
						    data-chart-library="easypiechart"
						    data-title="Disk Write"
						    data-width="10%"
						    data-before="0"
						    data-after="-420"
						    data-points="420"
						    data-common-units="system.io.mainhead"
						    role="application">
						</div>
						<div data-netdata="disk_space._"
						data-host={this.NetDataHost}
						    data-decimal-digits="0"
						    data-title="Available Disk"
						    data-dimensions="avail"
						    data-chart-library="easypiechart"
						    data-easypiechart-max-value="100"
						    data-common-max="avail"
						    data-width="11%"
						    data-height="100%"
						    data-after="-420"
						    data-points="420"
						    role="application">
						    </div>
						<div className="netdata-container-gauge" style={{marginRight:'11px'}} data-netdata="system.cpu"  data-host={this.NetDataHost}
						    data-chart-library="gauge"
						    data-title="CPU"
						    data-units="%"
						    data-gauge-max-value="100"
						    data-width="20%"
						    data-after="-420"
						    data-points="420"
						    data-colors="#22AA99"
						    role="application">
						</div>
						<div className="netdata-container-easypiechart" style={netdataStyle} data-netdata="system.ram" data-host={this.NetDataHost}
						    data-dimensions="used|buffers|active|wired"
						    data-append-options="percentage"
						    data-chart-library="easypiechart"
						    data-title="Used RAM"
						    data-units="%"
						    data-easypiechart-max-value="100"
						    data-width="11%"
						    data-after="-420"
						    data-points="420"
						    data-colors="#EE9911"
						    role="application">
						</div>
						<div className="netdata-container-easypiechart" style={netdataStyle} data-netdata="system.net" data-host={this.NetDataHost}
						    data-dimensions="received"
						    data-chart-library="easypiechart"
						    data-title="Net Inbound"
						    data-width="10%"
						    data-before="0"
						    data-after="-420"
						    data-points="420"
						    data-common-units="system.net.mainhead"
						    role="application">
						</div>
						<div className="netdata-container-easypiechart" style={netdataStyle} data-netdata="system.net" data-host={this.NetDataHost}
						    data-dimensions="sent"
						    data-chart-library="easypiechart"
						    data-title="Net Outbound" data-width="10%"
						    data-before="0"
						    data-after="-420"
						    data-points="420"
						    data-common-units="system.net.mainhead"
						    role="application">
						</div>
				</div>
					<div  style={{width:'100%', height:'100%', align:'center'}} className={hideCPU ? 'hidden' : ''}>
						<div data-host={this.NetDataHost} className="netdata-container-with-legend" id="chart_system_cpu" data-netdata="system.cpu" data-width="100%" data-height="180px" data-dygraph-valuerange="[0, 100]" data-before="0" data-after="-420" data-id="neb-cor-01_system_cpu" data-colors="" data-decimal-digits="-1" role="application" style={{width:'100%',height:'180px'}}>	
						</div>				
					</div>
					<div  style={{width:'100%', height:'100%', align:'center'}} className={hideMemory ? 'hidden' : ''}>	 
					   <div data-host={this.NetDataHost} className="netdata-container-with-legend" id="chart_system_ram" data-netdata="system.ram" data-width="100%" data-height="180px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-420" data-id="neb-cor-01_system_ram" data-colors="" data-decimal-digits="-1" role="application" style={{width:'100%',height:'180px'}}>	   
						</div>				
					</div>
					<div  style={{width:'100%', height:'100%', align:'center'}} className={hideDisk ? 'hidden' : ''}>	 
					   <div data-host={this.NetDataHost} className="netdata-container-with-legend" id="chart_system_io" data-netdata="system.io" data-width="100%" data-height="180px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-420" data-id="neb-cor-01_system_io" data-colors="" data-decimal-digits="-1" role="application" style={{width:'100%',height:'180px'}}>	   
						</div>				
					</div>
					<div  style={{width:'100%', height:'100%', align:'center'}} className={hideNetwork ? 'hidden' : ''}>	 
					  <div data-host={this.NetDataHost} className="netdata-container-with-legend" id="chart_system_net" data-netdata="system.net" data-width="100%" data-height="180px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-420" data-id="neb-cor-01_system_net" data-colors="" data-decimal-digits="-1" role="application" style={{width:'100%',height:'180px'}}>	   
						</div>				
					</div>
					<div  style={{width:'100%', height:'100%', align:'center'}} className={hideService ? 'hidden' : ''}>	 
					   <div data-host={this.NetDataHost} className="netdata-container-with-legend" id="chart_services_cpu" data-netdata="services.cpu" data-width="100%" data-height="180px" data-dygraph-valuerange="[null, null]" data-before="0" data-after="-420" data-id="neb-cor-01_services_cpu" data-colors="" data-decimal-digits="-1" role="application" style={{width:'100%',height:'180px'}}>	   
						</div>				
					</div>
				</div>
              </Row>
            </CardFooter>
          </Card>
        </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
