import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
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

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      assetCountStatus: false,
      assetCount: 0,
      itemsCountStatus: false,
      itemsCount: 0,
      binCountStatus: false,
      binCounts: 0,
      eventsCountStatus: false,
      eventsCount: 0
      
    };
  }
  NetDataHost = "http://kurrenttv.nbla.cloud:19999";
  componentDidMount() {
  	var that = this;
  	const data = { object_type: 'asset'};  
  	const itemsdata = { object_type: 'item'};
  	const bindata = { object_type: 'bin'};
  	const eventsdata = { object_type: 'event'};
  	
  	NebulaApi.getAssets(data).then(res => {      	     	
        this.setState({
          assetCount: res.data.count,
          assetCountStatus: true
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
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
	var {assetCountStatus, assetCount, itemsCountStatus, itemsCount, binCountStatus, binCounts, eventsCountStatus, eventsCount} = this.state;
	var netdataStyle = {
		marginRight:'10px',
		width:'11%',
		willchange: 'transform'
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
                <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                  <tr>
                    <th>Title</th>
                    <th>Action</th>
                    <th>Created</th>
                    <th>Started</th>
                    <th>Finished</th>
                    <th>Progress</th>
                    <th>Message</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>
                      <a href="#">trip_to_the_moon</a>
                    </td>
                    <td>
                      <div>Proxy</div>
                    </td>
                    <td>
                      <div>2019-05-06 21:30:44</div>
                    </td>
                    <td>
                      <div>2019-05-06 21:30:48</div>
                    </td>
                    <td>
                      <div></div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">2019-05-06 21:32:55</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="success" value="50" />
                    </td>
                    <td>
                      <strong>In Progress</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">schroedingers_room</a>
                    </td>
                    <td>
                      <div>Proxy</div>
                    </td>
                    <td>
                      <div>2019-05-02 11:11:51</div>
                    </td>
                    <td>
                      <div>2019-05-02 11:15:24</div>
                    </td>
                    <td>
                      <div>2019-05-02 11:17:28</div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>100%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">2019-05-02 11:17:28</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="success" value="100" />
                    </td>
                    <td>
                      <strong>Finished in 2 minutes (4.98x realtime)</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="#">schroedingers_room</a>
                    </td>
                    <td>
                      <div>Proxy</div>
                    </td>
                    <td>
                      <div>2019-05-02 11:11:51</div>
                    </td>
                    <td>
                      <div>2019-05-02 11:15:24</div>
                    </td>
                    <td>
                      <div>2019-05-02 11:17:28</div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>100%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">2019-05-02 11:17:28</small>
                        </div>
                      </div>
                      <Progress className="progress-xs" color="danger" value="100" />
                    </td>
                    <td>
                      <strong>Failed</strong>
                    </td>
                  </tr>
                  </tbody>
                </Table>
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
                  <CardTitle className="mb-0">System</CardTitle>
                  <div className="small text-muted">Overview of the key system metrics.</div>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0">CPUs</CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0">Memory</CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0">Disks</CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0">Networking Stack</CardTitle>
                </Col>
                <Col sm="2">
                  <CardTitle className="mb-0">Services</CardTitle>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Row className="text-center">
              	<div style={{width:'100%',maxHeight:'calc(100% - 15px)',textAlign:'center', display:'inline-block'}}>
					<div style={{width:'100%', height:'100%', align:'center', display:'inline-block'}}>
	                
               <div className="netdata-container-easypiechart" style={{marginRight:'11px'}} data-netdata="system.io" data-host={this.NetDataHost} data-dimensions="in"
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
									    data-title="Net
									    Outbound" data-width="10%"
									    data-before="0"
									    data-after="-420"
									    data-points="420"
									    data-common-units="system.net.mainhead"
									    role="application">
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
