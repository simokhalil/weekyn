import React from 'react';

import { withStyles } from '@material-ui/core';

import ContentToolbar from 'components/content/ContentToolbar';
import Content from 'components/content/Content';
import NoContentCard from 'components/content/NoContentCard';

import './Homepage.scss';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
});

const today = new Date();
today.setHours(0, 0, 0, 0);

class Homepage extends React.Component {

  render() {

    return (
      <Content>

        <ContentToolbar title="Dashboard" />

        <NoContentCard />

      </Content>
    );
  }
}

export default withStyles(styles)(
  Homepage,
);
