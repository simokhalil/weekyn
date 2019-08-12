import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';
import { withRouter } from 'react-router';

import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import AppConfig from 'AppConfig';
import * as DateUtils from '../../utils/date';
import * as ProjectsActions from '../../redux/actions/projects';

const styles = () => ({

});

class ProjectsList extends Component {
  state = {
    anchorEl: null,
  };

  handleInvoiceMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleInvoiceMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  gotoInvoice = (id) => {
    const { history } = this.props;
    history.push(`${AppConfig.routePaths.invoices}/${id}`);
  }

  render() {
    const { classes, t, invoices } = this.props;
    const { anchorEl } = this.state;

    const isInvoiceMenuOpen = Boolean(anchorEl);

    return (
      <div>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{t('invoices.date')}</TableCell>
              <TableCell align="right">{t('invoices.number')}</TableCell>
              <TableCell align="right">{t('invoices.clientName')}</TableCell>
              <TableCell align="right">{t('invoices.amountExclTax')}</TableCell>
              <TableCell align="right">{t('invoices.status')}</TableCell>
              <TableCell align="right">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <>
              {!invoices && (
                <TableRow>
                  <TableCell>
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {invoices && !invoices.length && (
                <TableRow>
                  <TableCell>
                    Vous n'avez aucun projet pour ce client
                  </TableCell>
                </TableRow>
              )}

              {invoices && invoices.map((invoice, invoiceIndex) => (
                <TableRow key={invoiceIndex} onClick={() => this.gotoInvoice(invoice.id)}>
                  <TableCell component="th" scope="row">
                    <ListItemText primary={DateUtils.formatDate(invoice.date)} secondary={invoice.title} />
                  </TableCell>
                  <TableCell align="right">{invoice.number}</TableCell>
                  <TableCell align="right">{invoice.client.name}</TableCell>
                  <TableCell align="right">{invoice.totalExclTax}</TableCell>
                  <TableCell align="right">{invoice.status}</TableCell>
                  <TableCell align="right">
                    <>
                      <IconButton
                        aria-owns={`action-menu-${invoice.id}`}
                        aria-haspopup="true"
                        onClick={this.handleInvoiceMenuOpen}
                      >
                        <MoreHorizIcon />
                      </IconButton>

                      <Menu
                        id={`action-menu-${invoice.id}`}
                        anchorEl={anchorEl}
                        open={isInvoiceMenuOpen}
                        onClose={this.handleProjectMenuClose}
                      >
                        <MenuItem onClick={this.handleProjectMenuClose} style={{ fontSize: '0.8rem' }}>{t('common.download')}</MenuItem>
                        <MenuItem onClick={this.handleProjectMenuClose} style={{ fontSize: '0.8rem' }}>{t('common.delete')}</MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>

              ))}
            </>

          </TableBody>
        </Table>
      </div>
    );
  }
}

ProjectsList.propTypes = {
  classes: PropTypes.object.isRequired,
  invoices: PropTypes.array,
  t: PropTypes.func.isRequired,
};

ProjectsList.defaultProps = {
  invoices: [],
};

export default withStyles(styles)(
  translate()(
    connect(null, ProjectsActions)(
      withRouter(
        ProjectsList,
      ),
    ),
  ),
);