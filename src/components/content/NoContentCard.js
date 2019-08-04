import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { translate } from 'react-polyglot';

import { Paper, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  card: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexVertical: {
    flexDirection: 'column',
  }
});

const NoContentCard = ({children, classes, description, t, title, vertical}) => (
  <Paper className={classNames(classes.card, { [classes.flexVertical]: vertical })} elevation={5}>
    <div style={{marginRight: '50px'}}>
      <img src={require('../../assets/images/img-01.png')} style={{width: '150px'}} alt="dashboard" />
    </div>

    <div style={vertical ? {textAlign: 'center'} : {}}>
      <Typography variant="h5" component="h3">
        {title || t('common.noDataToShow')}
      </Typography>
      <Typography variant="h6" component="p">
        {description || t('dashboard.description')}
      </Typography>
    </div>

    {children}
  </Paper>
);

NoContentCard.propTypes = {
  chidren: PropTypes.any,
  classes: PropTypes.any.isRequired,
  vertical: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string
};

NoContentCard.defaultProps = {
  description: null,
  title: null,
  vertical: false,
};

export default withStyles(styles)(
  translate()(
    NoContentCard
  )
);
