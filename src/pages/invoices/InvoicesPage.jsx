import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  CardHeader,
} from '@material-ui/core';

import AppConfig from '../../AppConfig';
import Button from '../../components/form/Button';
import Content from '../../components/content/Content';
// import ContentToolbar from '../../components/content/ContentToolbar';
import InvoicesList from '../../components/invoices/InvoicesList';
import SectionTitle from '../../components/content/SectionTitle';
import * as InvoicesActions from '../../redux/actions/invoices';


/* const invoices = [{
  id: 1,
  type: 'INVOICE',
  number: '001',
  client: { name: 'Client 1' },
  date: new Date(),
  title: 'Facture',
  amount: 478,
  status: 'DRAFT'
}] */

class InvoicesPage extends Component {
  constructor(props) {
    super(props);
    props.getInvoices();
  }

  gotoNewInvoice = () => {
    const { history } = this.props;
    history.push(AppConfig.routePaths.newInvoice);
  };

  render() {
    const { invoices, t } = this.props;
    return (
      <Content>
        {/* <ContentToolbar title={t('invoices.invoices')} /> */}

        <CardHeader
          action={
            <Button variant="contained" color="secondary" size="small" onClick={this.gotoNewInvoice}>
              {t('invoices.newInvoice')}
            </Button>
          }
          title={<SectionTitle label={t('invoices.invoices')} />}
          style={{ marginBottom: '30px' }}
        />

        <InvoicesList invoices={invoices} />
      </Content>
    );
  }
}

InvoicesPage.propTypes = {
  invoices: PropTypes.array,
  getInvoices: PropTypes.func.isRequired,
};

InvoicesPage.defaultProps = {
  invoices: [],
};

const mapStateToProps = state => ({
  invoices: state.invoices.invoices,
});

export default translate()(
  connect(mapStateToProps, InvoicesActions)(
    InvoicesPage,
  ),
);
