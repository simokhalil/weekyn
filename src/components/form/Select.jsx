import PropTypes from 'prop-types';
import React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as SelectMui,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

const Select = ({ label, name, value, onChange, options, placeholder }) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const generatedId = new Date().getTime();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor={`select-${generatedId}`}>
        {label}
        </InputLabel>
      <SelectMui
        value={value}
        onChange={onChange}
        labelWidth={labelWidth}
        inputProps={{
          name,
          id: `select-${generatedId}`,
        }}
      >
        {placeholder && (
          <MenuItem value={null}>
            <em>{placeholder}</em>
          </MenuItem>
        )}

        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}

      </SelectMui>
    </FormControl>
  )
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

Select.defaultProps = {
  label: null,
  name: '',
  options: [],
  placeholder: null,
  value: null,
};

export default Select;
