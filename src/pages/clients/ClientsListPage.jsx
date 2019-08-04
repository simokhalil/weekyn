import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  withStyles,
} from '@material-ui/core';

import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import AppConfig from 'AppConfig';
import Button from 'components/form/Button';
import Content from 'components/content/Content';
import ContentToolbar from 'components/content/ContentToolbar';
import * as DateUtils from 'utils/date';
import * as clientsActions from '../../redux/actions/clients';
import ConfirmationDialog from 'components/content/ConfirmationDialog';

const styles = {
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  clientsItemLink: {
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      background: '#f4f4f7',
    },
  },
};

class ClientsListPage extends Component {
  state = {
    isLoading: true,
    isDeleteConfirmationDialogOpen: false,
  };

  FbClientsSnapchotUnsubscribe = null;

  componentDidMount() {
    const { getClients } = this.props;

    getClients();
  }

  componentWillUnmount() {
    if (this.FbClientsSnapchotUnsubscribe) {
      this.FbClientsSnapchotUnsubscribe();
    }
  }

  gotoAddClient = () => {
    const { history } = this.props;
    history.push(AppConfig.routePaths.clientAdd);
  };

  onDeleteClient = () => {

  };

  openConfirmationDialog = () => this.setState({ isDeleteConfirmationDialogOpen: true });
  closeConfirmationDialog = () => this.setState({ isDeleteConfirmationDialogOpen: false });

  render() {
    const { isDeleteConfirmationDialogOpen } = this.state;
    const { classes, clients, t } = this.props;

    return (
      <Content>
        <ContentToolbar title="Clients" section="clients" />

        <div className={classes.actionBar}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.gotoAddClient}
          >
            Ajouter un client
          </Button>
        </div>

        <div>
          <List className={classes.root}>
            {clients.map((client, clientIndex) => (
              <Link to={`${AppConfig.routePaths.clients}/${client.id}`} key={clientIndex} className={classes.clientsItemLink}>
                <ListItem className={classes.clientsItemLink}>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={client.name} secondary={`${t('common.createdAt')} ${DateUtils.formatDate(client.createdAt)}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={this.openConfirmationDialog}>
                      <DeleteIcon style={{ fontSize: '0.9em', color: '#ff5757' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
              </Link>
            ))}
          </List>
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
  currentUser: PropTypes.object.isRequired,
  clients: PropTypes.array,
};

ClientsListPage.defaultProps = {
  clients: [],
};

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
  clients: state.clients.clients,
});

export default withStyles(styles)(
  connect(mapStateToProps, clientsActions)(
    translate()(
      ClientsListPage,
    ),
  ),
);
