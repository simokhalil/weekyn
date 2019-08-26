import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppConfig from './AppConfig';
import AppContainer from './components/containers/AppContainer';
// import AuthenticatedRoute from './components/auth/AuthenticatedRoute';

import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import LandingPage from './pages/landing-page/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from 'pages/auth/SignupPage';
import { userDB, firebase } from './firebase';
import { store } from './redux/store';

if (AppConfig.debug === 'false') {
  console.log = () => { };
}

class App extends React.Component {

  componentDidMount() {
    this.userAuthStateChangedUnsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      console.log('AppContainer : Got authUser', authUser);
      if (authUser && authUser.emailVerified) {
        let infos = {
          email: authUser.email,
          uid: authUser.uid,
          displayName: authUser.displayName,
          emailVerified: authUser.emailVerified,
        };
        this.setState(() => ({ authUser: infos, isLoading: false }));

        store.dispatch({
          type: 'USER_SIGNED_IN',
          data: { ...infos },
        });

        store.dispatch({
          type: 'GET_PROJECTS',
          payload: {},
        });

        userDB.onceGetUser(infos.uid)
          .then(userData => {
            userData = userData.data();
            infos = {
              ...infos,
              ...userData,
            };

            console.log('got user data : ', userData);

            store.dispatch({
              type: 'USER_SIGNED_IN',
              data: { ...infos },
            });
          })
      }
    });
  }

  render() {
    return (

      <Switch>
        <Route path={AppConfig.routePaths.landingPage} exact component={LandingPage} />
        <Route path={AppConfig.routePaths.login} exact component={LoginPage} />
        <Route path={AppConfig.routePaths.signup} exact component={SignupPage} />
        <Route path={AppConfig.routePaths.forgotPassword} exact component={ForgotPasswordPage} />
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
