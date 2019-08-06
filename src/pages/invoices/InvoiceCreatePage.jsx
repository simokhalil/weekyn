import React, { Component } from 'react';

import {
  withStyles,
} from '@material-ui/core';
import Content from 'components/content/Content';

const styles = () => ({
  page: {
    width: '900px',
    minHeight: '1200px',
    position: 'relative',
    background: '#fff',
    border: '1px solid #eee',
    padding: '70px 70px 25px',
    margin: 'auto',
  },
});

class InvoiceCreatePage extends Component {

  render() {
    const { classes } = this.props;

    return (
      <Content>
        <div>Nouvelle facture</div>

        <div className={classes.page}>
          <textarea placeholder="Coordonnées de ma société">
            Khalil\n@: khalil_simo@hotmail.fr
          </textarea>
        </div>
      </Content>
    );
  }
}

export default withStyles(styles)(
  InvoiceCreatePage,
);
