import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import NebulaApi from '../../../utils/api/NebulaApi';
import CookiesHelper from '../../../utils/CookiesHelper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    }
  }
  onChange = (field) => (event) => {
    this.setState({[field]: event.target.value, error: ''});
  }
  authenticate = () => {
    const { username, password } = this.state;

    NebulaApi.authenticate({login: username, password}).then(response => {
      const code = response && response.data && response.data.response;

      if (code === 200) {
        const sessionId = response && response.data && response.data.session_id;
        const is_admin = response && response.data && response.data.data && response.data.data.is_admin;

        CookiesHelper.setCookie('session_id', sessionId);
        CookiesHelper.setCookie('is_admin', is_admin);
        this.props.history.push('/');
      } else {
        this.setState({error: response.data.message});
        CookiesHelper.removeCookie('session_id')
      }

    });
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" value={username} onChange={this.onChange('username')} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="password" value={password} onChange={this.onChange('password')} />
                    </InputGroup>
                    {error
                      ? (<div className="alert alert-danger alert-dismissible fade show">
                        {error}
                      </div>)
                      : null
                    }
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.authenticate}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
