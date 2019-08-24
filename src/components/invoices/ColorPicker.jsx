import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
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
    left: 0,
  },
  paperFlat: {
    display: 'inline-block',
  },
  button: {
    minWidth: '20px',
    width: '20px',
    height: '20px',
    padding: 0,
  },
});

const ColorPicker = ({ className, color, flat, style, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <div className={classNames(classes.root, className)} style={style}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          {!flat && (
            <Button onClick={handleClick} className={classes.button} style={{ backgroundColor: color }}><span /></Button>
          )}

          {(open || flat) && (
            <Paper className={flat ? classes.paperFlat : classes.paper}>
              <TwitterPicker
                color={color}
                onChangeComplete={(color) => onChange(color.hex)}
                triangle={flat ? 'hide' : 'top-left'}
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
  flat: PropTypes.bool,
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

ColorPicker.defaultProps = {
  className: '',
  flat: false,
  style: {},
};

export default ColorPicker;
