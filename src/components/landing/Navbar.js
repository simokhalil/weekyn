import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { translate } from 'react-polyglot';

import { AppBar, Button, CssBaseline, Toolbar, useScrollTrigger, withStyles } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/MenuOutlined';

import AppConfig from '../../AppConfig';

const styles = {
  buttonLink: {
    marginLeft: '10px',
    marginRight: '15px',
  },
};

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

const NavBar = ({ classes, location, t, ...rest }) => {

  const menuItems = [
    {
      label: t('landing.home'),
      href: '#home',
    }, {
      label: 'A propos',
      href: '#services',
    }, {
      label: 'Tarifs',
      href: '#pricing',
    },
  ];

  const currentHash = location.hash && location.hash.length ? location.hash : '#home';

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...rest}>
        <AppBar color="inherit" className="navbarFixedTop navbar-expand-lg">
          <Toolbar className="navbar">
            <div className="container" >
              <Link className="navbar-brand" to="/" style={{ flexGrow: 1 }}>Weekyn</Link>

              {/* <ul className="navbar-nav ml-auto" style={{ display: 'flex' }}>
                {menuItems.map((menuItem, menuItemIndex) => (
                    <li key={menuItemIndex} className={currentHash === menuItem.href ? 'current' : ''}>
                      <a href={menuItem.href}>{menuItem.label}</a>
                    </li>
                  ))}
              </ul> */}

              <Button variant="outlined" color="primary" size="large" component={AdapterLink} className={classes.buttonLink} to={AppConfig.routePaths.login}>Connexion</Button>
              {/* <Button variant="outlined" color="primary" size="medium" component={AdapterLink} className={classes.buttonLink} to={AppConfig.routePaths.signup}>Inscription</Button> */}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar style={{ height: '90px' }} />

      {/* <header className="header">
        <nav className="navbar navbarFixedTop">
          <div className="container">
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="/">Weekyn</a>

              <button className="navbar-toggler collapsed" type="button">
                <span className="navbar-toggler-icon">
                  <MenuIcon />
                </span>
              </button>

              <div className="navbar-collapse collapse" id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  {menuItems.map((menuItem, menuItemIndex) => (
                    <li key={menuItemIndex} className={currentHash === menuItem.href ? 'current' : ''}>
                      <a href={menuItem.href}>{menuItem.label}</a>
                    </li>
                  ))}
                  <li className="discover-link">
                    <Link to={AppConfig.routePaths.login} className="external discover-btn">Connexion</Link>
                  </li>
                  <li className="discover-link">
                    <Link to={AppConfig.routePaths.signup} className="external discover-btn">Inscription</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </nav>
        </header> */}
    </>
  )
};

export default withRouter(
  translate()(
    withStyles(styles)(
      NavBar,
    ),
  ),
);
