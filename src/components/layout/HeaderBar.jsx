import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  AppBar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  withStyles,
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';

import AccountButton from '../AccountButton';
import AppConfig from '../../AppConfig';

const drawerWidth = AppConfig.drawerWidth;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: 'none',
    '& $menuButton': {
      marginLeft: theme.spacing(1),
    },
    width: `calc(100% - ${AppConfig.drawerWidth}px)`,
    backgroundColor: '#fff',
    color: '#363B40',
  },
  flex: {
    flex: 1,
    textAlign: 'right'
  },
  appBarShift: {
    transition: theme.transitions.create(['width', 'margin', 'background'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('lg')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    '& $menuButton': {
      marginLeft: 0
    }
  },
  appBarDarken: {
    boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  companySelect: {
    color: 'white',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class HeaderBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  gotoPage = (path) => {
    console.log('path : ', path);
    this.props.history.push(path);
  };

  render() {
    const { classes, currentUser, darken } = this.props;
    const { mobileMoreAnchorEl } = this.state;

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarDarken]: darken,
          })}
        >
          <Toolbar>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* <IconButton color="inherit">
                  <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton> */}

              <AccountButton userName={currentUser && currentUser.name} />
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    );
  }
}

HeaderBar.propTypes = {
  classes: PropTypes.any.isRequired,
  currentUser: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps)(
      HeaderBar
    )
  )
);
