import React from 'react';

import {
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';

const Switch = () => {

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch checked={true} onChange={(e) => console.log('checked', e)} value="checkedA" />
        }
        label="Secondary"
      />
    </FormGroup>
  );
}

export default Switch;
