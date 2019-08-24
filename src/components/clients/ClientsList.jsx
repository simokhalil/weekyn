import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
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
  Tooltip,
  withStyles,
} from '@material-ui/core';

import ArchiveIcon from '@material-ui/icons/ArchiveOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import RestoreIcon from '@material-ui/icons/RestoreOutlined';

import AppConfig from '../../AppConfig';
import * as DateUtils from '../../utils/date';

const styles = () => ({
  clientsItemLink: {
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      background: '#f4f4f7',
    },
  },
});

const ClientsList = ({ classes, clients, deleteType, onDeleteClient, onEditClient, onRestoreClient, t }) => {

  const onDelete = (event, clientId) => {
    event.preventDefault();
    event.stopPropagation();

    onDeleteClient(clientId);
  };

  const onRestore = (event, clientId) => {
    event.preventDefault();
    event.stopPropagation();

    onRestoreClient(clientId);
  };

  const onEdit = (event, clientId) => {
    event.preventDefault();
    event.stopPropagation();

    onEditClient(clientId);
  };

  return (
    <List className={classes.root}>
      {clients.map((client, clientIndex) => (
        <Link to={`${AppConfig.routePaths.clients}/${client.id}`} key={clientIndex} className={classes.clientsItemLink}>
          <ListItem className={classes.clientsItemLink}>
            <ListItemAvatar>
              <Avatar>
                <StoreIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} secondary={`${t('common.createdAt')} ${DateUtils.formatDate(client.createdAt)}`} />
            <ListItemSecondaryAction>
              <Tooltip title={t('common.edit')}>
                <IconButton edge="end" aria-label="edit" onClick={(e) => onEdit(e, client.id)}>
                  <EditIcon style={{ fontSize: '0.9em' }} />
                </IconButton>
              </Tooltip>

              {onRestoreClient && (
                <Tooltip title={t('common.restore')}>
                  <IconButton edge="end" aria-label="restore" onClick={(e) => onRestore(e, client.id)}>
                    <RestoreIcon style={{ fontSize: '0.9em', color: '#00c386' }} />
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title={t(deleteType === 'delete' ? 'common.delete' : 'common.archive')}>
                <IconButton edge="end" aria-label="delete" onClick={(e) => onDelete(e, client.id)}>
                  {deleteType === 'delete' && (
                    <DeleteIcon style={{ fontSize: '0.9em', color: '#ff5757' }} />
                  )}

                  {deleteType === 'archive' && (
                    <ArchiveIcon style={{ fontSize: '0.9em', color: '#ff5757' }} />
                  )}
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider component="li" />
        </Link>
      ))}
    </List>
  );
}

ClientsList.propTypes = {
  classes: PropTypes.object.isRequired,
  clients: PropTypes.array.isRequired,
  deleteType: PropTypes.oneOf(['delete', 'archive']),
  onDeleteClient: PropTypes.func.isRequired,
  onRestoreClient: PropTypes.func,
  t: PropTypes.func.isRequired,
};

ClientsList.defaultProps = {
  deleteType: 'delete',
  onRestoreClient: null,
};

export default translate()(
  withStyles(styles)(
    ClientsList,
  ),
);
