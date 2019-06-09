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
import moment from 'moment';
import filesize from 'filesize';
import { rgbToHex } from '@coreui/coreui-pro/dist/js/coreui-utilities';

import classnames from "classnames";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

// react-html5video
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

import NebulaApi from "../../utils/api/NebulaApi";
import { MEDIA_TYPES, CONTENT_TYPES, KURRENTTV_BASE_URL } from "../../utils/Constants";

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

class Details extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      asset: {}
    };

  }


  componentDidMount() {
    const id = this.props.match.params.id
    const payload = { object_type: "asset" };
    NebulaApi.getAssets(payload).then(
      res => {
        let asset = {}

        console.log(res.data, id)
        if (res && res.data && res.data.data) {
          asset = res.data.data.find(item => item.id === parseInt(id)) || {}
        }
        console.log(res.data);
        this.setState({asset, assetInitial: { ...asset }})
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

  onChange = (field) => (event) => {
    const asset = { ...this.state.asset };
    asset[field] = event.target.value;

    this.setState({asset});
  }

  handleRevert = () => {
    this.setState({asset: this.state.assetInitial})
  }

  handleSave = () => {
    const { asset } = this.state;
    console.log('onSave', asset)
    // TODO send save request
  }

  render() {
    const { asset } = this.state;
    const create_date = new Date(asset['ctime'])

    console.log('asset', asset)
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-body">
            <Row>
              <Col xs="5" className="mb-4">
                <div style={{ position:'relative' }}>
                  {/*<img style={{ width: '100%'}} src={'https://i.kinja-img.com/gawker-media/image/upload/s--Lbtqb63d--/c_scale,f_auto,fl_progressive,q_80,w_800/mufdyjsh6g83tj5hl7rz.png'} alt="boohoo" className="img-responsive"/>*/}
                  {asset.id
                    ? (
                      <Video
                        controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                        // poster="http://sourceposter.jpg"
                        onCanPlayThrough={() => {
                           // Do stuff
                        }}>
                        <source src={`${KURRENTTV_BASE_URL}/proxy/0000/${asset.id}.mp4`} type="video/webm" />
                      </Video>
                    )
                    : null
                  }

                  {/*<i style={{ position:'absolute' ,top:'50%' ,left:'50%' ,fontSize:'100px' ,margin:'-50px 0 0 -40px'}} className="fa fa-play-circle"></i>*/}
                  <div style={{ textAlign:'center' ,fontSize:'20px' }}>
                    <i className="fa fa-flag text-success" />
                    <span>  </span>
                    <i className="fa fa-flag text-secondary" />
                    <span>  </span>
                    <i className="fa fa-flag text-danger" />
                    <span>  </span>
                    <button className="badge badge-block btn-outline-secondary" disabled>{moment.unix(asset.duration).utc().format('HH:mm:ss.SSS')}</button>
                  </div>
                </div>
              </Col>
              <Col xs="7" md="7" className="mb-4">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Main
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      Extended
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '3' })}
                      onClick={() => { this.toggle('3'); }}
                    >
                      Technical
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <div className="animated fadeIn">
                      <Row>
                        <Col lg="12">
                          <Row>
                            <Col xs="12">
                              <FormGroup>
                                <Label htmlFor="name">Title</Label>
                                <Input type="text" id="title" placeholder="Enter title" value={asset.title} onChange={this.onChange('title')} required />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Subtitle</Label>
                                <Input type="text" id="subtitle" placeholder="Subtitle..." value={asset.subtitle} onChange={this.onChange('subtitle')} required />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Description</Label>
                                <Input type="textarea" name="textarea-input" id="textarea-input" rows="2" value={asset.description} onChange={this.onChange('description')}
                                       placeholder="Description..." />
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Folder</Label>
                                <Input type="select" name="select" id="select">
                                  <option value="0">Movie</option>
                                  <option value="1">Serie</option>
                                  <option value="2">Story</option>
                                  <option value="3">Song</option>
                                  <option value="4">Fill</option>
                                  <option value="5">Trailer</option>
                                  <option value="6">Jingle</option>
                                  <option value="7">Graphics</option>
                                  <option value="8">Commercial</option>
                                  <option value="9">Teleshopping</option>
                                  <option value="10">Dataset</option>
                                  <option value="11">Incoming</option>
                                </Input>
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Genre</Label>
                                <Input type="select" name="select" id="select">
                                  <option value="0">Select</option>
                                  <option value="1">Option #1</option>
                                  <option value="2">Option #2</option>
                                  <option value="3">Option #3</option>
                                </Input>
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Content alert</Label>
                                <Input type="select" name="select" id="select">
                                  <option value="0">Select</option>
                                  <option value="1">mulit select with groups</option>
                                  <option value="2">Option #2</option>
                                  <option value="3">Option #3</option>
                                </Input>
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Validity ends</Label>
                                <Input type="date" id="date-input" name="date-input" placeholder="date" />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="animated fadeIn">
                      <Row>
                        <Col lg="12">
                          <Card className="bg-secondary">
                            <CardBody>
                              <pre><strong>Path	: </strong>{asset.path}</pre>
                              <pre><strong>Status	: </strong><i className={`fa fa-circle text-${asset.status === 1 ? 'success' : 'danger'}`} /> {asset.status === 1 ? 'ONLINE' : 'OFFLINE'}</pre>
                              <pre><strong>Folder	: </strong>{asset.id_folder}</pre>
                              <pre><strong>Storage ID : </strong>{asset.id_storage} (production)</pre>
                              <pre><strong>Media Type :	</strong>{MEDIA_TYPES[asset.media_type]}</pre>
                              <pre><strong>Content Type :	</strong>{CONTENT_TYPES[asset.content_type]}</pre>
                              <pre><strong>ID	: </strong>{asset.id}</pre>
                              <pre><strong>Creation Time :	</strong>{moment.unix(asset.ctime).format('YYYY-MM-DD HH:mm')}</pre>
                              <pre><strong>Modify Time :	</strong>{moment.unix(asset.mtime).format('YYYY-MM-DD HH:mm')}</pre>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <div className="animated fadeIn">
                      <Row>
                        <Col lg="12">
                          <Card className="bg-secondary">
                            <CardBody>
                              <pre><strong>Duration	: </strong>{moment.unix(asset.duration).utc().format('HH:mm:ss.SSS')}</pre>
                              <pre><strong>File Modified	: </strong>{moment.unix(asset['file/mtime']).format('YYYY-MM-DD HH:mm')}</pre>
                              <pre><strong>File Size	: </strong>{filesize(asset['file/size'] || 0)}</pre>
                              <pre><strong>QC State	: </strong>4</pre>
                              <pre><strong>Aspect Ratio	: </strong>{asset['video/aspect_ratio']}</pre>
                              <pre><strong>Aspect Ratio	: </strong>{asset['video/aspect_ratio_f']}</pre>
                              <pre><strong>Video Codec	: </strong>{asset['video/codec']}</pre>
                              <pre><strong>Color Range	: </strong>{asset['video/color_range']}</pre>
                              <pre><strong>Color Space	: </strong>{asset['video/color_spcace']}</pre>
                              <pre><strong>FPS	: </strong>{asset['video/fps']}</pre>
                              <pre><strong>FPS	: </strong>{asset['video/fps_f']}</pre>
                              <pre><strong>Height	: </strong>{asset['video/height']}</pre>
                              <pre><strong>Pixel Format	: </strong>{asset['video/pixel_format']}</pre>
                              <pre><strong>Width	: </strong>{asset['video/width']}</pre>
                            </CardBody>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </TabPane>
                </TabContent>
              </Col>
              <Col xs="12" md="12" className="mb-4">
                <FormGroup style={{ float:'right'}} >
                  <Button type="button" color="success" className="mr-1" onClick={this.handleSave}>Save</Button>
                  <Button type="reset" color="danger" className="mr-1" onClick={this.handleRevert}>Revert</Button>
                </FormGroup>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;