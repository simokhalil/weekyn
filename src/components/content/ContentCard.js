import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { Paper, withStyles } from '@material-ui/core';

const styles = theme => ({
  card: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
  },
});

const ContentCard = ({children, classes, className, vertical}) => (
  <Paper className={classNames(classes.card, className)} elevation={5}>
    {children}
  </Paper>
);

ContentCard.propTypes = {
  chidren: PropTypes.any,
  className: PropTypes.object,
  classes: PropTypes.any.isRequired,
  vertical: PropTypes.bool,
};

ContentCard.defaultProps = {
  className: {},
  vertical: false,
};

export default withStyles(styles)(ContentCard);
