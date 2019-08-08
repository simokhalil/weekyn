import PropTypes from 'prop-types';
import React from 'react';
import { TwitterPicker } from 'react-color';

import {
  Button,
  ClickAwayListener,
  Paper,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    top: 36,
    right: 0,
    left: 0,
  },
  button: {
    minWidth: '20px',
    width: '20px',
    height: '20px',
    padding: 0,
  },
});

const ColorPicker = ({ className, color, style, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className={className} style={style}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <Button onClick={handleClick} className={classes.button} style={{ backgroundColor: color }}><span /></Button>
          {open && (
            <Paper className={classes.paper}>
              <TwitterPicker
                color={color}
                onChangeComplete={(color) => onChange(color.hex)}
              />
            </Paper>
          )}
        </div>
      </ClickAwayListener>
    </div>
  );
}

ColorPicker.proTypes = {
  className: PropTypes.string,
  color: PropTypes.string.isRequired,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  className: '',
  style: {},
};

export default ColorPicker;
