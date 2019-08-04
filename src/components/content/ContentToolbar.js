import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { translate } from 'react-polyglot';

import {
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';

import AppConfig from '../../AppConfig';
import { subMenuItems } from '../layout/sidebar/SideBarItems';

// import Breadcrubms from '../breadcrumbs/Breadcrumbs';

const styles = theme => ({
  toolbar: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '0 8px 10px 20px',
    ...theme.mixins.toolbar,
  },
  title: {
    display: 'inline-block',
    color: '#363B40',
    margin: '20px 0',
  },
  subtitle: {
    display: 'inline-block',
    color: '#363B40',
    marginLeft: '20px',
    fontStyle: 'italic',
  },
  menuContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    borderBottom: '1px solid #eee',
    position: 'relative',
    height: '64px',
    width: '100%',
  },
  menu: {
    overflowY: 'hidden',
    overflowX: 'auto',
    listStyle: 'none',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    maxWidth: AppConfig.contentWidth,
  },
  menuItem: {
    display: 'inline-block'
  },
  menuItemLink: {
    display: 'block',
    textDecoration: 'none',
    position: 'relative',
    fontSize: '1rem',
    padding: '14px 2px',
    margin: '0 14px',
    color: '#acb3bb',
    '&.selected': {
      color: '#1e88e5',
    },
    '&.selected:after': {
      position: 'absolute',
      backgroundColor: '#1e88e5',
      bottom: 0,
      left: '0',
      display: 'block',
      content: '""',
      height: '2px',
      width: '100%',
      transition: 'ease-in all .15s',
    },
  },
});

const ContentToolbar = ({ children, classes, location, title, section, subtitle, t }) => (
  <div className={classes.toolbar}>
    {/* <Breadcrubms theme='light' /> */}

    {title && (
      <div>
        <Typography variant="h6" className={classes.title}>{title}</Typography>
        {subtitle && (
          <Typography variant="subtitle1" className={classes.subtitle}>{subtitle}</Typography>
        )}
      </div>
    )}

    {!!section && (
      <Toolbar className={classes.menuContainer}>
        <ul className={classes.menu}>
          {subMenuItems[section].map((item, index) => (
            <li key={index} className={classes.menuItem}>
              <Link to={item.path} className={classNames(classes.menuItemLink, { selected: location.pathname === item.path})}>{t(`submenus.${item.text}`)}</Link>
            </li>
          ))}
        </ul>
      </Toolbar>
    )}
  </div>
);

ContentToolbar.propTypes = {
  classes: PropTypes.any.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ContentToolbar.defaultProps = {
  title: null,
  subtitle: null,
};

export default withStyles(styles)(
  withRouter(
    translate()(
      ContentToolbar
    )
  )
);
