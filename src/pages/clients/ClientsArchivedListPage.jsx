import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  withStyles,
} from '@material-ui/core';

import AppConfig from 'AppConfig';
import ClientsList from '../../components/clients/ClientsList';
import Content from 'components/content/Content';
import ContentToolbar from 'components/content/ContentToolbar';
import * as clientsActions from '../../redux/actions/clients';
import ConfirmationDialog from 'components/content/ConfirmationDialog';
import { clientsDB } from '../../firebase';

const styles = {
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

class ClientsListPage extends Component {
  state = {
    isLoading: true,
    isDeleteConfirmationDialogOpen: false,
  };

  componentDidMount() {
    const { getClients } = this.props;

    getClients(false);
  }

  gotoAddClient = () => {
    const { history } = this.props;
    history.push(AppConfig.routePaths.clientAdd);
  };

  onEditClient = (clientId) => {
    const { history } = this.props;
    history.push(`${AppConfig.routePaths.clients}/${clientId}/edit`);
  };

  onRestoreClient = async (clientId) => {
    const { currentUser } = this.props;
    await clientsDB.restoreClient(currentUser.uid, clientId);
  };

  onDeleteClient = async (clientId) => {
    const { deleteClient } = this.props;
    deleteClient(clientId);
  };

  openConfirmationDialog = () => this.setState({ isDeleteConfirmationDialogOpen: true });
  closeConfirmationDialog = () => this.setState({ isDeleteConfirmationDialogOpen: false });

  render() {
    const { isDeleteConfirmationDialogOpen } = this.state;
    const { clients, t } = this.props;

    return (
      <Content>
        <ContentToolbar title="Clients" section="clients" />

        <div>
          <ClientsList
            clients={clients}
            onEditClient={this.onEditClient}
            onDeleteClient={this.onDeleteClient}
            onRestoreClient={this.onRestoreClient}
          />
        </div>

        <ConfirmationDialog
          isOpen={isDeleteConfirmationDialogOpen}
          onCancel={this.closeConfirmationDialog}
          onConfirm={this.onDeleteClient}
          title={t('clients.deleteConfirmationTitle')}
          text={t('clients.deleteConfirmationText')}
        />
      </Content>
    );
  }
}

ClientsListPage.propTypes = {
  clients: PropTypes.array,
  deleteClient: PropTypes.func.isRequired,
};

ClientsListPage.defaultProps = {
  clients: [],
};

const mapStateToProps = state => ({
  clients: state.clients.archivedClients,
  currentUser: state.users.authUser,
});

export default withStyles(styles)(
  connect(mapStateToProps, clientsActions)(
    translate()(
      ClientsListPage,
    ),
  ),
);
