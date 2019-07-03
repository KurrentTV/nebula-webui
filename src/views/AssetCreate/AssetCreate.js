import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
import {
  Button,
  Col,
  FormGroup,
  Input,
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
  Label,
} from 'reactstrap';
import DropzoneComponent from 'react-dropzone-component';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';

import classnames from "classnames";
import NebulaApi from "../../utils/api/NebulaApi";

var componentConfig = { postUrl: 'no-url' };
var djsConfig = {
  // autoProcessQueue: false,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview">
      <div className="dz-details">
        <div className="dz-filename"><span data-dz-name="true"></span></div>
        <img data-dz-thumbnail="true" />
      </div>
      <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress="true"></span></div>
      <div className="dz-success-mark"><span>✔</span></div>
      <div className="dz-error-mark"><span>✘</span></div>
      <div className="dz-error-message"><span data-dz-errormessage="true"></span></div>
    </div>
  )
};
var eventHandlers = { addedfile: (file) => console.log(file) };

class AssetCreate extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      asset: {},
      isLoaded: false,
    };

  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    const payload = { object_type: "asset", ids: [id] };
    NebulaApi.getAssets(payload).then(
      res => {
        let asset = {};

        if (res && res.data && res.data.data) {
          asset = res.data.data.find(item => item.id === parseInt(id)) || {}
        }
        this.setState({asset, assetInitial: { ...asset }, isLoaded: true})
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
    const payload = { object_type: "asset", data: asset };

    // update asset request
    NebulaApi.setAssets(payload).then(
      res => {
        this.props.history.push('/assets')
      },
      err => {
        console.error(err);
      }
    );
  }

  render() {
    const { asset, isLoaded } = this.state;
    const create_date = new Date(asset['ctime'])

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-body">
            {isLoaded
              ? (<Row>
                <Col xs="7" md="7" className="mb-4">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === '1'})}
                        onClick={() => {
                          this.toggle('1');
                        }}
                      >
                        Main
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === '2'})}
                        onClick={() => {
                          this.toggle('2');
                        }}
                      >
                        Extended
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({active: this.state.activeTab === '3'})}
                        onClick={() => {
                          this.toggle('3');
                        }}
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
                                  <Input type="text" id="title" placeholder="Enter title" value={asset.title}
                                         onChange={this.onChange('title')} required/>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="name">Subtitle</Label>
                                  <Input type="text" id="subtitle" placeholder="Subtitle..."
                                         value={asset.subtitle || ''} onChange={this.onChange('subtitle')} required/>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="name">Description</Label>
                                  <Input type="textarea" name="textarea-input" id="textarea-input" rows="2"
                                         value={asset.description || ''} onChange={this.onChange('description')}
                                         placeholder="Description..."/>
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
                                  <Input type="date" id="date-input" name="date-input" placeholder="date"/>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                  </TabContent>
                </Col>
                <Col xs="5" md="5" className="mb-4">
                  <Row>
                    <Col xs="12" md="12" className="mb-4">
                      <FormGroup style={{float: 'right'}}>
                        <Button type="button" color="success" className="mr-1" onClick={this.handleSave}>Save</Button>
                        <Button type="reset" color="danger" className="mr-1" onClick={this.handleRevert}>Revert</Button>
                      </FormGroup>
                    </Col>
                    <Col xs="12" md="12" className="mb-4">
                      <div style={{position: 'relative', color: '#000'}}>
                        <DropzoneComponent config={componentConfig}
                                           eventHandlers={eventHandlers}
                                           djsConfig={djsConfig} />
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>)
              : <div> Loading....</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default AssetCreate;