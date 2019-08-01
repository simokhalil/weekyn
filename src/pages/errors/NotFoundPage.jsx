import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import { withStyles } from '@material-ui/core';

import AppConfig from '../../AppConfig';
import ErrorWrap from '../../components/errors/ErrorWrap';

const title = AppConfig.appName + ' - Page Not Found';
const description = 'Description';

const styles = () => ({
  container: {
    flex: 1,
  },
});

const NotFoundPage = ({ classes }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404;
      }
      return (
        <div className={classes.container}>
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
          </Helmet>
          <ErrorWrap title="404" desc="Oops, Page Not Found :(" />
        </div>
      );
    }}
  />
);

export default withStyles(styles)(NotFoundPage);
