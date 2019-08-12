import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { CssBaseline, withStyles } from '@material-ui/core';

import AppConfig from '../../AppConfig';
import HeaderBar from '../layout/HeaderBar';
import NotFoundPage from '../../pages/errors/NotFoundPage';
import SideMenu from '../layout/sidebar/Sidebar';
import * as ClientsActions from '../../redux/actions/clients';
import { userDB, firebase } from '../../firebase';
import { store } from '../../redux/store';

import ActivityReportPage from 'pages/activity-report/ActivityReportPage';
import ClientsPage from 'pages/clients/ClientsPage';
import Homepage from 'pages/homepage/Homepage';
import InvoiceCreatePage from 'pages/invoices/InvoiceCreatePage';
import InvoicesPage from 'pages/invoices/InvoicesPage';
import SettingsPage from 'pages/settings/SettingsPage';

const styles = theme => {
  return ({
    root: {
      display: 'flex',
      height: '100%',
    },
    toolbar: {
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 8px 0 20px',
      ...theme.mixins.toolbar,
    },
    main: {
      flexGrow: 1,
      marginTop: '60px',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      padding: '20px',
    },
  });
};

const sectionStatus = {
  messages: 4,
};

class AppContainer extends React.Component {

  state = {
    transform: 0,
    authUser: null,
    isLoading: true,
  };

  userAuthStateChangedUnsubscribe = null;

  componentDidMount() {
    const { getClients, history, location } = this.props;

    this.userAuthStateChangedUnsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      console.log('AppContainer : Got authUser', authUser);
      if (authUser) {
        let infos = {
          email: authUser.email,
          uid: authUser.uid,
          displayName: authUser.displayName,
          emailVerified: authUser.emailVerified,
        }
        this.setState(() => ({ authUser: infos, isLoading: false }));

        store.dispatch({
          type: 'USER_SIGNED_IN',
          data: { ...infos },
        });

        getClients();

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

            store.dispatch({
              type: 'GET_USER_SAGA',
            });
          })
      } else {

        store.dispatch({
          type: 'GET_USER_CANCEL',
        });

        store.dispatch({
          type: 'FETCH_CLIENTS_CANCEL',
        });

        store.dispatch({
          type: 'FETCH_INVOICES_CANCEL',
        });

        store.dispatch({
          type: 'GET_PROJECTS_CANCEL',
        });

        store.dispatch({
          type: 'USER_SIGNED_OUT',
          data: {
            redirectTo: location.pathname,
          },
        });

        console.log('user not logged in => redirecting from ', this.props);

        this.setState(() => ({ authUser: null, isLoading: false }));

        history.push(AppConfig.routePaths.login);
      }
    });

    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      mainContent.addEventListener('scroll', this.handleScroll);

      // Execute all arguments when page changes
      this.unlisten = this.props.history.listen(() => {
        mainContent.scrollTo(0, 0);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  componentWillUnmount() {
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
      mainContent.removeEventListener('scroll', this.handleScroll);
      if (this.unlisten) {
        this.unlisten();
      }
    }

    if (this.userAuthStateChangedUnsubscribe) {
      this.userAuthStateChangedUnsubscribe();
    }
  }

  handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    this.setState({
      transform: scroll
    });
  };

  render() {
    const { isLoading } = this.state;
    const { classes, currentUser } = this.props;

    const darken = true;

    if (!currentUser || isLoading) {
      return null;
    }

    return (
      <div className={classes.root}>
        <CssBaseline />

        <SideMenu status={sectionStatus} />

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

          <main className={classes.main} id="mainContent">
            <HeaderBar
              darken={this.state.transform > 30 && darken}
            />

            <Switch>
              <Route path={AppConfig.routePaths.homepage} exact component={Homepage} />


              <Route path={AppConfig.routePaths.clients} component={ClientsPage} />

              <Route path={AppConfig.routePaths.activity} exact component={ActivityReportPage} />

              <Route path={AppConfig.routePaths.invoices} exact component={InvoicesPage} />
              <Route path={AppConfig.routePaths.newInvoice} exact component={InvoiceCreatePage} />
              <Route path={AppConfig.routePaths.invoice} exact component={InvoiceCreatePage} />

              <Route path={AppConfig.routePaths.settings} exact component={SettingsPage} />

              <Route path="**" component={NotFoundPage} />
            </Switch>

          </main>
        </div>
      </div>
    );
  }
}

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

AppContainer.defaultProps = {
  currentUser: null,
};

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
});

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, ClientsActions)(
    AppContainer,
  ),
);
