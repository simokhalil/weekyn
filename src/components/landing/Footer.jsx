import React from 'react';

import { withStyles } from '@material-ui/core';

import AppConfig from 'AppConfig';

const styles = {
  footer: {
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    padding: '60px 0 55px 0',
    background: 'transparent linear-gradient(80deg, #3863a3 1%, #1a78cf 99%) repeat scroll 0% 0%',
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
};

const Footer = ({ classes }) => {
  const year = new Date().getFullYear();
  return (
    <div className={classes.footer} id="pricing">
      <div className="container">
        <div className={classes.center}>
          <p className={classes.footerText}>Copyright © {year} {AppConfig.appName}</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(
  Footer,
);
