import PropTypes from 'prop-types';
import React from 'react';

import {
  FormControl,
  InputLabel,
  MenuItem,
  // makeStyles,
} from '@material-ui/core';

/* const useStyles = makeStyles(theme => ({
  formControl: {

  },
})); */

class Select extends React.Component {

  render() {
    return (
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-age-simple">
          Age
        </InputLabel>
        <Select
          value={10}
        >
          <option value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    )
  }
}

export default Select;
