import PropTypes from 'prop-types';
import React from 'react';
import classNames from "classnames";

import { withStyles } from '@material-ui/core';

const dangerColor = '#00ffff';

const styles = theme => ({
  floatingLabel: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    marginBottom: '15px',
    marginTop: '15px',
  },
  input: {
    flex: 1,
    width: '100%',
    transition: 'all 0.1s ease-in-out 0s',
    border: '1px solid #DCDEE0',
    verticalAlign: 'middle',
    borderRadius: '3px',
    height: '50px',
    padding: '0px 16px',
    fontSize: '15px',
    backgroundColor: '#ffffff',
    fontFamily: 'Raleway',
    fontWeight: 'inherit',
  },
  inputError: {
    border: `1px solid #ff0000`,
  },
  label: {
    position: 'absolute',
    top: '5px',
    left: '16px',
    pointerEvents: 'none',
    fontSize: '11px',
    color: '#9DA2A6',
    fontWeight: 'bold',
    lineHeight: '18px',
    display: 'none',
    zIndex: '100',
  },
  labelError: {
    color: dangerColor,
  },
  helperText: {
    display: 'block',
    fontSize: '12px',
    position: 'absolute',
    bottom: '-18px',
    left: '2px',
  },
});

const Input = ({ classes, error, helperText, label, onChange, type, value, style, required, ...rest }) => {

  const inputClasses = classNames({
    [classes.input]: true,
    error: error,
  });

  const labelClasses = classNames({
    [classes.label]: true,
    [classes.labelError]: error,
  });

  const helperTextClasses = classNames({
    [classes.helperText]: true,
    [classes.labelError]: error,
  });

  return (
    <label className={classes.floatingLabel} style={style}>
      <span className={labelClasses} style={{ display: (!value || !value.length) ? 'none' : 'inline' }}>{label}</span>
      <input
        type={type}
        className={inputClasses}
        value={value}
        placeholder={`${label} ${required ? '*' : ''}`}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...style, paddingTop: value && value.length && '14px', flex: 1 }}
        {...rest}
      />
      <div className={helperTextClasses}>{helperText}</div>
    </label>
  );
};

Input.propTypes = {
  classes: PropTypes.any.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.any,
  label: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.any,
};

Input.defaultProps = {
  error: false,
  helperText: '',
  label: '',
  required: false,
  style: {},
  type: 'text',
  value: '',
  onChange: () => {
  },
};

export default withStyles(styles)(Input);
