import React from 'react';
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


const invoices = [{
  id: 1,
  type: 'INVOICE',
  number: '001',
  client: { name: 'Client 1' },
  date: new Date(),
  title: 'Facture',
  amount: 478,
  status: 'DRAFT'
}]

const InvoicesPage = ({ history, t }) => {

  const gotoNewInvoice = () => {
    history.push(AppConfig.routePaths.newInvoice);
  };

  return (
    <Content>
      {/* <ContentToolbar title={t('invoices.invoices')} /> */}

      <CardHeader
        action={
          <Button variant="contained" color="secondary" size="small" onClick={gotoNewInvoice}>
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

export default translate()(
  InvoicesPage,
);
