import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import AppConfig from '../../AppConfig';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: `0 ${theme.spacing(3)}`,
    flexDirection: 'column',
    position: 'relative',
  },
  container: {
    maxWidth: AppConfig.contentWidth,
    margin: '10px auto 50px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  fullWidth: {
    width: '100%',
    maxWidth: '100%',
  },
  smallWidth: {
    width: '768px',
    maxWidth: '100%',
  },
});

const Content = ({children, classes, fullWidth, smallWidth}) => (
  <div className={classes.content}>
    <div className={classNames(classes.container, { [classes.fullWidth]: fullWidth, [classes.smallWidth]: smallWidth })}>
      {children}
    </div>
  </div>
);

Content.propTypes = {
  chidren: PropTypes.any,
  classes: PropTypes.any.isRequired,
  fullWidth: PropTypes.bool,
  smallWidth: PropTypes.bool,
};

Content.defaultProps = {
  fullWidth: false,
  smallWidth: false,
};

export default withStyles(styles)(Content);
