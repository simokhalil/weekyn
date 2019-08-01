import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppConfig from 'AppConfig';
// import checkAuth from '../../utils/check-auth';

const AuthenticatedRoute = ({
  component: Component,
  fallbackComponent: FallBackComponent,
  path,
  permission,
  ...rest
}) => (
    <Route
      {...rest}
      render={props => (
        checkAuth()
          ? <Component {...props} />
          : FallBackComponent
            ? <FallBackComponent {...props} />
            : <Redirect to={{ pathname: AppConfig.routePaths.login, state: { from: props.location } }} />
      )}
    />
  );

AuthenticatedRoute.propTypes = {
  component: PropTypes.any.isRequired,
  fallbackComponent: PropTypes.any,
  path: PropTypes.any.isRequired,
  permission: PropTypes.any,
  location: PropTypes.any.isRequired,
};

AuthenticatedRoute.defaultProps = {
  fallbackComponent: null,
  permission: null,
};

const mapStateToProps = state => ({
  user: state.user.currentUser,
});

export default connect(mapStateToProps)(AuthenticatedRoute);
