import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { CssBaseline, withStyles } from '@material-ui/core';

import AppConfig from '../../AppConfig';
import HeaderBar from '../layout/HeaderBar';
import NotFoundPage from '../../pages/errors/NotFoundPage';
import SideMenu from '../layout/sidebar/Sidebar';
import { db, firebase } from '../../firebase';

import Homepage from 'pages/homepage/Homepage';

const styles = theme => {
  console.log(theme.palette);

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
      overflow: 'scroll',
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
    const { dispatch, history, location } = this.props;

    this.userAuthStateChangedUnsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      console.log('got authUser : ', authUser);

      if (authUser) {
        let infos = {
          email: authUser.email,
          uid: authUser.uid,
          displayName: authUser.displayName,
          emailVerified: authUser.displayName,
        }
        this.setState(() => ({ authUser: infos, isLoading: false }));

        dispatch({
          type: 'USER_SIGNED_IN',
          data: { ...infos },
        });

        db.onceGetUser(infos.uid)
          .then(userData => {
            userData = userData.data();
            infos = {
              ...infos,
              ...userData,
            };

            console.log('got user data : ', userData);

            dispatch({
              type: 'USER_SIGNED_IN',
              data: { ...infos },
            });
          })
      } else {

        console.log('this.props', this.props);

        dispatch({
          type: 'USER_SIGNED_OUT',
          data: {
            redirectTo: location.pathname,
          },
        });

        console.log('user not logged in => redirecting from ', this.props);

        history.push(AppConfig.routePaths.login);

        this.setState(() => ({ authUser: null, isLoading: false }));
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
  connect(mapStateToProps)(
    AppContainer
  )
);
