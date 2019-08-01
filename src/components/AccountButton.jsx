import React, { Component } from 'react';
import { translate } from 'react-polyglot';
import { withRouter } from 'react-router-dom';

import {
  Button,
  Divider,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';

import { auth } from '../firebase';

const styles = {
  icon: {
    marginLeft: '10px',
  },
};

class AccountButton extends Component {
  state = {
    anchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProfileMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  signOut() {
    auth.doSignOut();
  }

  render() {

    const { anchorEl } = this.state;
    const { classes, userName, t } = this.props;

    const isProfileMenuOpen = Boolean(anchorEl);

    return (
      <div>
        <Button
          disableFocusRipple
          disableRipple
          aria-owns={isProfileMenuOpen ? 'user-menu' : null}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          {userName}
          <AccountCircle className={classes.icon} />
        </Button>

        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={isProfileMenuOpen}
          onClose={this.handleProfileMenuClose}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <Divider />
          <MenuItem onClick={this.signOut}>{t('login.signout')}</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styles)(
    translate()(
      AccountButton,
    )
  )
);
