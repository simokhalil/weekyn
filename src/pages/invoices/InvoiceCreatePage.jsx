import ContentEditable from 'react-contenteditable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  CardHeader,
  Chip,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import AppConfig from 'AppConfig';
import Autocomplete from 'components/form/Autocomplete';
import Button from '../../components/form/Button';
import ColorPicker from 'components/invoices/ColorPicker';
import Content from 'components/content/Content';
import Doc from '../../utils/doc';
import PdfContainer from '../../components/invoices/PdfContainer';
import SectionTitle from '../../components/content/SectionTitle';
import * as InvoicesActions from '../../redux/actions/invoices';
import { invoicesDB } from '../../firebase';
import { storage } from '../../firebase/firebase';

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
  colorPicker: {
    position: 'absolute',
    top: '15px',
    right: '-30px',
  },
};

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
    paddingRight: '10px',
    paddingLeft: '10px',
    borderLeft: '2px solid #fff',
    borderRight: '2px solid #fff',
    '&:not(.description)': {
      width: '100px',
    },
  },
  body: {
    fontSize: 14,
    padding: 0,
    paddingTop: '10px',
    borderLeft: '2px solid #fff',
    borderRight: '2px solid #fff',
    borderBottom: 0,
    verticalAlign: 'top',
    '&:not(.description)': {
      width: '100px',
    },
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    marginBottom: '10px',
    paddingTop: '10px',
    /* '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },*/
  },
}))(TableRow);

const INITIAL_INVOICE_LINE = {
  description: '',
  priceExclTax: '',
  tax: 20,
  quantity: '',
  totalExclTax: 0,
};

const INITIAL_INVOICE_CLIENT = {
  name: '',
  address: '',
  postalCode: '',
  city: '',
  country: '',
}

class InvoiceCreatePage extends Component {

  invoiceDiv = null;

  constructor(props) {
    super(props);

    this.state = {
      invoice: {
        status: AppConfig.invoiceStates.DRAFT,
        number: '',
        color: (props.currentUser && props.currentUser.settings && props.currentUser.settings.defaultColor) || null,
        emitterInfos: (props.currentUser && props.currentUser.settings && props.currentUser.settings.emitterInfo) || '',
        emissionDate: '',
        dueDate: '',
        title: '',
        totalExclTax: 0,
        totalInclTax: 0,
        client: { ...INITIAL_INVOICE_CLIENT },
        lines: [{ ...INITIAL_INVOICE_LINE }],
      },
      isLoading: true,
    };

    /* if (props.currentUser && props.currentUser.settings && props.currentUser.settings.logoId) {
      this.getUserSettings(props.currentUser.settings);
    } */
  }

  componentDidMount() {
    this.getInvoice();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currentUser
      && nextProps.currentUser.settings
      && (!this.props.currentUser || !this.props.currentUser.settings)
    ) {
      this.getUserSettings(nextProps.currentUser.settings);
    }
  }

  getInvoice = async () => {
    const { currentUser, match} = this.props;

    const invoiceId = match.params.id;

    if (invoiceId) {
      const invoice = await invoicesDB.getInvoice(currentUser.uid, invoiceId);

      const invoiceData = invoice.data();

      this.setState({
        invoice: {
          ...invoiceData,
          client: {
            ...invoiceData.client,
          },
          id: invoiceId,
        },
        isLoading: false,
      }, () => {
          if (currentUser.settings) {
            this.getUserSettings(currentUser.settings);
          }
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  getUserSettings = async (settings) => {
    const { invoice } = this.state;

    if (settings.logoId) {
      invoice.logoUrl = await storage
        .child('logos/' + settings.logoId)
        .getDownloadURL();
    }

    invoice.emitterInfos = settings.emitterInfo;
    invoice.color = invoice.color || settings.defaultColor;

    this.setState({ invoice });

  };

  createPdf = (html) => {
    Doc.html2pdf(html);
  };

  handleInvoiceInputChange = (field, value) => {
    const { invoice } = this.state;
    invoice[field] = value;
    this.setState({ invoice });
  };

  handleClientInputChange = (field, value) => {
    const { invoice } = this.state;
    invoice.client[field] = value;
    this.setState({ invoice });
  };

  handleClientSelect = (client) => {
    const { invoice } = this.state;
    /* const { clients } = this.props;
    const selectedClient = clients.find(client => client.id === clientId); */

    invoice.client = client;

    this.setState({
      invoice,
      isClientSelected: true,
    });
  };

  handleUnselectClient = () => {
    const { invoice } = this.state;
    invoice.client = { ...INITIAL_INVOICE_CLIENT };
    this.setState({
      invoice,
      isClientSelected: false,
    });
  }

  handleInvoiceLineChange = (lineIndex, field, value) => {
    const { invoice } = this.state;
    invoice.lines[lineIndex][field] = parseFloat(value) || value ;

    if (parseFloat(invoice.lines[lineIndex].quantity) && parseFloat(invoice.lines[lineIndex].priceExclTax)) {
      const totalExclTax = parseFloat(invoice.lines[lineIndex].quantity) * parseFloat(invoice.lines[lineIndex].priceExclTax);
      invoice.lines[lineIndex].totalExclTax = totalExclTax;

      this.calculateInvoiceTotals();
    }

    this.setState({ invoice });
  };

  calculateInvoiceTotals = () => {
    const { invoice } = this.state;
    invoice.totalExclTax = +0;
    invoice.totalInclTax = +0;

    invoice.lines.forEach((line) => {
      invoice.totalExclTax += parseFloat(line.totalExclTax);
      invoice.totalInclTax += parseFloat(line.totalExclTax) + (parseFloat(line.totalExclTax) * line.tax / 100);
    });

    this.setState({ invoice });
  };

  addInvoiceLine = () => {
    const { invoice } = this.state;
    invoice.lines.push({ ...INITIAL_INVOICE_LINE });
    this.setState({ invoice });
  };

  deleteInvoiceLine = (index) => {
    const { invoice } = this.state;
    invoice.lines.splice(index, 1);
    this.setState({ invoice });
  }

  saveInvoice = () => {
    const { invoice } = this.state;
    const { saveInvoice } = this.props;
    invoice.status = AppConfig.invoiceStates.SAVED;

    saveInvoice(invoice);
    this.setState({ invoice });
  };

  render() {
    const { invoice, isLoading } = this.state;
    const { classes, clients, currentUser, t } = this.props;

    return (
      <Content>
        <CardHeader
          action={
            <>
              <Button variant="contained" color="secondary" size="small" onClick={this.saveInvoice} style={{ marginRight: '10px' }}>
                {t('common.save')}
              </Button>
              <Button variant="outlined" color="secondary" size="small" onClick={() => this.createPdf(this.invoiceDiv)}>
                {t('invoices.exportPdf')}
              </Button>
            </>
          }
          title={<SectionTitle label={t(`invoices.newInvoiceTitle.${invoice.status}`, { number: invoice.number })} />}
          style={{ marginBottom: '30px' }}
        />

        <div style={{ textAlign: 'center', margin: '10px 0 30px' }}>
          <Chip label={t(`invoices.statusLabel.${invoice.status}`)} className={classes.chip} />
        </div>

        {!isLoading && (
          <PdfContainer createPdf={this.createPdf}>
            <div id="invoice" className={classes.page} ref={ref => this.invoiceDiv = ref}>
              <div className="invoiceEditorHeader">
                <div className="invoiceEditorEmitter">
                  {!!invoice.logoUrl && (
                    <div className="logoWrapper">
                      <img src={invoice.logoUrl} alt={currentUser.name} />
                    </div>
                  )}

                  <ContentEditable
                    className="emitterInfos fakeInput"
                    placeholder="Infos emetteur"
                    html={invoice.emitterInfos} // innerHTML of the editable div
                    disabled={false}       // use true to disable editing
                    onChange={(e) => this.handleInvoiceInputChange('emitterInfos', e.target.value)} // handle innerHTML change
                  />
                </div>

                <div className="invoiceEditorCustomer">
                  <div className={classNames('invoiceEditorCustomerWrapper', { 'selectedClient': !!invoice.client.id }, { fakeInput: !!invoice.client.id })}>
                    {!!invoice.client.id && (
                      <>
                        <span>{invoice.client.name}</span>
                        <span>{invoice.client.address}</span>
                        <span>{invoice.client.postalCode} {invoice.client.city}</span>
                        <span>{invoice.client.country}</span>
                        <IconButton aria-label="delete" style={{ position: 'absolute', right: '5px', top: '5px' }} size="small" onClick={() => this.handleUnselectClient()}>
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      </>
                    )}

                    {!invoice.client.id && (
                      <>
                        <Autocomplete
                          items={clients}
                          placeholder="Client"
                          onChange={(e) => this.handleClientInputChange('name', e)}
                          onSelect={(client) => this.handleClientSelect(client)}
                          initialValue={invoice.client.name}
                        />
                        <input
                          className="fakeInput"
                          placeholder="Adresse"
                          value={invoice.client.address}
                          onChange={(e) => this.handleClientInputChange('address', e.target.value)}
                        />
                        <div style={{ display: 'flex' }}>
                          <input
                            className="fakeInput"
                            placeholder="CP"
                            value={invoice.client.postalCode}
                            onChange={(e) => this.handleClientInputChange('postalCode', e.target.value)}
                            style={{ width: '80px' }}
                          />
                          <input
                            className="fakeInput"
                            placeholder="Ville"
                            value={invoice.client.city}
                            onChange={(e) => this.handleClientInputChange('city', e.target.value)}
                            style={{ flex: 1 }}
                          />
                        </div>
                        <input
                          className="fakeInput"
                          placeholder="Pays"
                          value={invoice.client.country}
                          onChange={(e) => this.handleClientInputChange('country', e.target.value)}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="invoiceEditorBody">
                <div className="invoiceType">
                  <span>{t(`invoices.newInvoiceTitle.${invoice.status}`, { number: invoice.number })}</span>
                </div>

                <input
                  className="invoiceTitle fakeInput"
                  placeholder="Intitulé de la facture"
                  value={invoice.title}
                  onChange={(e) => this.handleInvoiceInputChange('title', e.target.value)}
                />

                <div className="invoiceDates">
                  <div className="fakeInput">
                    <span>Date D'émission</span>
                    <input
                      placeholder="jj/mm/aaaa"
                      value={invoice.emissionDate}
                      onChange={(e) => this.handleInvoiceInputChange('emissionDate', e.target.value)}
                    />
                  </div>
                  <div className="fakeInput">
                    <span>Date De règlement</span>
                    <input
                      placeholder="jj/mm/aaaa"
                      value={invoice.dueDate}
                      onChange={(e) => this.handleInvoiceInputChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="invoiceLines">
                <ColorPicker
                  color={invoice.color}
                  onChange={(color) => this.handleInvoiceInputChange('color', color)}
                  className={classNames(classes.colorPicker, 'colorPicker')}
                />

                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className="description" style={{ backgroundColor: invoice.color}}>Description</StyledTableCell>
                      <StyledTableCell align="center" style={{ backgroundColor: invoice.color}}>Quantité</StyledTableCell>
                      <StyledTableCell align="center" style={{ backgroundColor: invoice.color}}>Prix unitaire</StyledTableCell>
                      <StyledTableCell align="center" style={{ backgroundColor: invoice.color}}>TVA</StyledTableCell>
                      <StyledTableCell align="center" style={{ backgroundColor: invoice.color}}>Prix HT</StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody style={{ paddingTop: '10px' }}>
                    {invoice.lines.map((line, lineIndex) => (
                      <StyledTableRow key={lineIndex} style={{ position: 'relative' }}>
                        <StyledTableCell className="description" scope="row">
                          <ContentEditable
                            className="fakeInput"
                            placeholder="Description"
                            html={line.description}
                            onChange={(e) => this.handleInvoiceLineChange(lineIndex, 'description', e.target.value)}
                            style={{ width: '100%' }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <input
                            className="fakeInput"
                            placeholder="Quantité"
                            value={line.quantity}
                            onChange={(e) => this.handleInvoiceLineChange(lineIndex, 'quantity', e.target.value)}
                            style={{ width: '100%', textAlign: 'right' }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <input
                            className="fakeInput"
                            placeholder="Prix unitaire"
                            value={line.priceExclTax}
                            onChange={(e) => this.handleInvoiceLineChange(lineIndex, 'priceExclTax', e.target.value)}
                            style={{ width: '100%', textAlign: 'right' }}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <FormControl className={classes.formControl}>
                            <NativeSelect
                              className={classes.selectEmpty}
                              value={line.tax}
                              name="age"
                              onChange={(e) => this.handleInvoiceLineChange(lineIndex, 'tax', e.target.value)}
                              inputProps={{ 'aria-label': 'TVA' }}
                              input={<InputBase className="fakeInput" />}
                            >
                              <option value="" disabled>
                                TVA
                              </option>
                              <option value={0}>0%</option>
                              <option value={10}>10%</option>
                              <option value={20}>20%</option>
                            </NativeSelect>
                          </FormControl>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {line.totalExclTax}

                          {(lineIndex > 0 || invoice.lines.length > 1) && (
                            <IconButton aria-label="delete" style={{ position: 'absolute', right: '-32px' }} size="small" onClick={() => this.deleteInvoiceLine(lineIndex)}>
                              <CloseIcon fontSize="inherit" />
                            </IconButton>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>

                <Divider style={{ margin: '30px auto 10px' }} />

                <div className="ButtonAddLine">
                  <Button
                    color="secondary"
                    size="small"
                    variant="outlined"
                    onClick={this.addInvoiceLine}
                  >
                    Ajouter une ligne
                  </Button>

                </div>

                <div className="invoiceTotals" style={{ color: invoice.color }}>
                  <div className="row">
                    <span>Total HT</span>
                    <span>{invoice.totalExclTax.toFixed(2)}</span>
                  </div>
                  <div className="row">
                    <span className="total">Total TTC</span>
                    <span className="total amount">{invoice.totalInclTax.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </PdfContainer>
        )}
      </Content>
    );
  }
}

InvoiceCreatePage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  clients: PropTypes.array,
  saveInvoice: PropTypes.func.isRequired,
};

InvoiceCreatePage.defaultProps = {
  clients: [],
};

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
  clients: state.clients.clients,
});

export default withStyles(styles)(
  translate()(
    connect(mapStateToProps, InvoicesActions)(
      InvoiceCreatePage,
    ),
  ),
);
