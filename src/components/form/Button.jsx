import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import { Button as MuiButton, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    textTransform: 'none',
    padding: '6px 15px',
  },
  secondary: {
    color: '#fff',
  },
});

const Button = ({ children, className, color, size, variant, ...rest }) => {
  const classes = useStyles();

  return (
    <MuiButton
      color={color}
      variant={variant}
      size={size}
      className={classNames(classes.root, classes[color], className)}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
};

Button.defaultProps = {
  children: null,
  className: null,
  color: 'primary',
  size: 'small',
  variant: 'contained',
};

export default Button;