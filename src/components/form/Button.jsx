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
  dangercontained: {
    background: '#FF7483',
    color: '#fff',
    '&:hover': {
      background: '#ff2940',
    },
  },
  secondaryoutlined: {
    color: '#00c386',
  },
  dangeroutlined: {
    border: '1px solid #FF7483',
    color: '#FF7483',
    '&:hover': {
      background: '#fff1f2',
    },
  },
});

const Button = ({ children, className, color, size, variant, ...rest }) => {
  const classes = useStyles();

  const classnames = classNames(
    classes.root,
    classes[color],
    className,
    [classes[`${color}${variant}`]],
    {
      [classes[`${color}${variant}`]]: variant === 'outlined',
    }
  );

  return (
    <MuiButton
      color={color}
      variant={variant}
      size={size}
      className={classnames}
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