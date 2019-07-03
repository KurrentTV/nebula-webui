import React, { Component } from "react";
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

import classnames from "classnames";

const configInitial = {
  values: {
    "siteName": "",
    "nebulaHub": "",
  },
  errors: {
    "siteName": "Site name is required",
    "nebulaHub": "Nebula Hub is required",
  },
};

class Settings extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      config: configInitial.values,
      isLoaded: false,
    };

  }

  componentDidMount() {
    this.setState({isLoaded: true});
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  onChange = (field) => (event) => {
    const config = { ...this.state.config };
    config[field] = event.target.value;

    this.setState({config});
  }

  handleRevert = () => {
    this.setState({config: this.state.configInitial})
  }

  handleSave = () => {
    const { config } = this.state;
    console.log('onSave config', config);
  }

  render() {
    const { config, isLoaded } = this.state;

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
                        Global
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
                                  <Label htmlFor="title">Site Name</Label>
                                  <Input type="text" id="title" placeholder="Site Name" value={config.siteName}
                                         onChange={this.onChange('siteName')} required/>
                                </FormGroup>
                                <FormGroup>
                                  <Label htmlFor="hub">Nebula Hub</Label>
                                  <Input type="text" id="hub" placeholder="Nebula Hub"
                                         value={config.nebulaHub || ''} onChange={this.onChange('nebulaHub')} required/>
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
                      <Card className="bg-secondary">
                        <CardBody>
                          <pre>{JSON.stringify(configInitial, null, 2) }</pre>
                        </CardBody>
                      </Card>
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

export default Settings;