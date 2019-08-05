import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { translate } from 'react-polyglot';

import { Drawer, List, withStyles } from '@material-ui/core';

import LinkIcon from '@material-ui/icons/Link';

import AppConfig from '../../../AppConfig';
import sideMenuItems from './SideBarItems';
import LogoImage from '../../../assets/images/Weekyn_logo_white_sm.png';

import './SideBar.scss';

const drawerWidth = AppConfig.drawerWidth;

const styles = theme => ({
  drawerPaper: {
    border: 'none',
    background: 'transparent linear-gradient(80deg, #3863a3 1%, #1a78cf 99%) repeat scroll 0% 0%',
    position: 'relative',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px 0 10px',
    ...theme.mixins.toolbar,
    margin: '40px 0 50px 0',
  },
  logo: {
    color: '#fff',
    fontSize: '3rem',
    maxWidth: '70%',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '32px',
    position: 'relative',
    color: '#a1c8ee',
    transition: 'color .3s',
    textDecoration: 'none',
    '&.selected': {
      color: '#fff',
      fontWeight: '500',
    },
  },
  menuItemIcon: {
    display: 'block',
    fontSize: '2rem',
    marginBottom: '10px',
    color: 'inherit',
  },
  menuItemText: {
    fontSize: '1rem',
    color: 'inherit',
  },
});

class SideMenu extends Component {

  render() {
    const { classes, location, status, t } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper),
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <img src={LogoImage} className={classes.logo} />
        </div>

        {sideMenuItems.map((sideMenuGroup, index) => (
          <div key={`group-${index}`}>

            <List>
              <Link to={sideMenuGroup.path} className={classNames(classes.menuItem, { selected: location.pathname.includes(sideMenuGroup.path) })}>
                {!status[sideMenuGroup.id] && (
                  <div><sideMenuGroup.icon className={classes.menuItemIcon} /></div>
                )}

                <div className={classes.menuItemText}>{t(`menus.${sideMenuGroup.id}`)}</div>
              </Link>
            </List>
          </div>
        ))}
      </Drawer>
    )
  }
}

SideMenu.propTypes = {
  classes: PropTypes.any.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  withRouter(
    translate()(
      SideMenu,
    )
  )
);
