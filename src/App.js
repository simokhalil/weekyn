import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppConfig from './AppConfig';
import AppContainer from './components/containers/AppContainer';
// import AuthenticatedRoute from './components/auth/AuthenticatedRoute';

import LandingPage from './pages/landing-page/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from 'pages/auth/SignupPage';

if (AppConfig.debug === 'false') {
  console.log = () => { };
}

class App extends React.Component {

  render() {
    return (

      <Switch>
        <Route path={AppConfig.routePaths.landingPage} exact component={LandingPage} />
        <Route path={AppConfig.routePaths.login} exact component={LoginPage} />
        <Route path={AppConfig.routePaths.signup} exact component={SignupPage} />
        <Route path={AppConfig.routePaths.homepage} component={AppContainer} fallbackComponent={LoginPage} />
      </Switch>

    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.authUser || [],
});

export default connect(mapStateToProps)(
  withRouter(App)
);
