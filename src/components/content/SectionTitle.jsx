import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  title: {
    display: 'inline-block',
    textDecoration: 'none',
    position: 'relative',
    fontSize: '1rem',
    padding: '5px 2px',
    margin: '0 14px',
    color: '#000',
    fontWeight: '600',

    '&:after': {
      position: 'absolute',
      backgroundColor: '#4a90e2',
      bottom: 0,
      left: '0',
      display: 'block',
      content: '""',
      height: '2px',
      width: '100%',
      transition: 'ease-in all .15s',
    },
  },
});

const SectionTitle = ({ label }) => {
  const classes = useStyles();

  return (
    <h2 className={classes.title}>{label}</h2>
  );
}

export default SectionTitle;
