import React from 'react';

import {
  FormGroup,
  FormControlLabel,
  Switch as SwitchMui,
} from '@material-ui/core';

const Switch = ({ label, onChange, value }) => {

  return (
    <div>
      <FormGroup row>
        <FormControlLabel
          control={
            <SwitchMui color="primary" checked={value} onChange={(e, val) => onChange(val)} value="checkedA" />
          }
          label={label}
        />
      </FormGroup>
    </div>
  );
}

export default Switch;
