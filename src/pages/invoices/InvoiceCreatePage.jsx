import React, { Component } from 'react';

import Doc from '../../utils/doc';
import PdfContainer from '../../components/invoices/PdfContainer';

import {
  withStyles,
} from '@material-ui/core';
import Content from 'components/content/Content';

import '../../stylesheets/invoice.scss';

const styles = {
  page: {
    flexDirection: 'column',
    width: '900px',
    minHeight: '1200px',
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #eee',
    padding: '70px 70px 25px',
    margin: 'auto',
    fontSize: '10pt',
  },
};

class InvoiceCreatePage extends Component {

  createPdf = (html) => Doc.html2pdf(html);

  render() {
    const { classes } = this.props;

    return (
      <Content>
        <div>Nouvelle facture</div>

        <PdfContainer createPdf={this.createPdf}>
          <div id="invoice" className={classes.page}>
            <div className="invoiceEditorHeader">
              <div className="invoiceEditorEmitter">
                <div className="logoWrapper fakeInput">
                  <img src={require('../../assets/images/Weekyn_logo.png')} />
                </div>

                <textarea className="emitterInfos fakeInput" placeholder="Infos emetteur" defaultValue="" />
              </div>

              <div className="invoiceEditorCustomer">
                <div className="invoiceEditorCustomerWrapper">
                  <input className="fakeInput" placeholder="Client" />
                  <input className="fakeInput" placeholder="Adresse" />
                  <div style={{ display: 'flex' }}>
                    <input className="fakeInput" placeholder="CP" style={{ width: '60px' }} />
                    <input className="fakeInput" placeholder="Ville" style={{ flex: 1 }} />
                  </div>
                  <input className="fakeInput" placeholder="Pays" />
                </div>
              </div>
            </div>

            <div className="invoiceEditorBody">
              <div className="invoiceType">
                <span>Facture</span>
              </div>

              <input className="invoiceTitle fakeInput" placeholder="Intitulé de la facture" />

              <div className="invoiceDates">
                <div className="fakeInput">
                  <span>Date D'émission</span>
                  <input placeholder="jj/mm/aaaa" />
                </div>
                <div className="fakeInput">
                  <span>Date De règlement</span>
                  <input placeholder="jj/mm/aaaa" />
                </div>
              </div>
            </div>
          </div>
        </PdfContainer>
      </Content>
    );
  }
}

export default withStyles(styles)(
  InvoiceCreatePage,
);
