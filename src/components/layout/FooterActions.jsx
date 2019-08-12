import PropTypes from 'prop-types';
import React from 'react';

import { makeStyles } from '@material-ui/core';

import AppConfig from 'AppConfig';
import Button from 'components/form/Button';

const useStyles = makeStyles({
  root: {
    width: `calc(100% - ${AppConfig.drawerWidth}px)`,
    position: 'fixed',
    bottom: '0',
    right: '0',
    background: '#fff',
    zIndex: 10,
    borderTop: '1px solid rgba(193,201,209,.5)',
    boxShadow: '0 -3px 15px 0 rgba(48, 48, 48, .15)',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  actionsContainer: {
    padding: '2rem',
  },
  button: {
    margin: '0 1rem',
  },
});

const FooterActions = ({ validateLabel, cancelLabel, onCancel, onValidate }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.actionsContainer}>
        {cancelLabel && (
          <Button
            variant="outlined"
            color="default"
            className={classes.button}
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
        )}

        {validateLabel && (
          <Button
            color="secondary"
            className={classes.button}
            onClick={onValidate}
          >
            {validateLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

FooterActions.propTypes = {
  cancelLabel: PropTypes.string,
  validateLabel: PropTypes.string,
  onValidate: PropTypes.func,
};

FooterActions.defaultProps = {
  cancelLabel: null,
  validateLabel: null,
  onValidate: () => true,
};

export default FooterActions;
