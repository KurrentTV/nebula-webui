import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import './App.scss';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import CookiesHelper from './utils/CookiesHelper';
import NebulaApi from './utils/api/NebulaApi';
import RequireNoAuth from "./components/RequireNoAuth";
import RequireAuth from "./components/RequireAuth";

const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = Loadable({
  loader: () => import('./containers/DefaultLayout'),
  loading
});

// Pages
const Login = Loadable({
  loader: () => import('./views/Pages/Login'),
  loading
});

const Register = Loadable({
  loader: () => import('./views/Pages/Register'),
  loading
});

const Page404 = Loadable({
  loader: () => import('./views/Pages/Page404'),
  loading
});

const Page500 = Loadable({
  loader: () => import('./views/Pages/Page500'),
  loading
});

class App extends Component {
  componentDidMount() {
    // this.authenticate()
  }

  authenticate = () => {
    NebulaApi.authenticate().then(response => {
      const sessionId = response.data.session_id;

      CookiesHelper.setCookie('session_id', sessionId)
    });
  };

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={RequireNoAuth(Login)} />
          <Route
            exact
            path="/register"
            name="Register Page"
            component={RequireNoAuth(Register)}
          />
          <Route exact path="/404" name="Page 404" component={RequireNoAuth(Page404)} />
          <Route exact path="/500" name="Page 500" component={RequireNoAuth(Page500)} />
          <Route path="/" name="Home" component={RequireAuth(DefaultLayout)} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
