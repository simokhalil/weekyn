import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
  Paper,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/EmailOutlined';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/PhoneOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';

import Button from '../../components/form/Button';
import Content from 'components/content/Content';
import ContentToolbar from 'components/content/ContentToolbar';
import * as DateUtils from '../../utils/date';
import { clientsDB } from '../../firebase';

const styles = {
  title: {
    marginBottom: '30px',
  },
};

class ClientDetailsPage extends Component {
  state = {
    client: null,
  }

  componentDidMount() {
    this.getClient();
  }

  getClient = async () => {
    const { currentUser } = this.props;
    const { match } = this.props;

    const clientId = match.params.id;

    const client = await clientsDB.getClient(currentUser.uid, clientId);

    this.setState({ client: client.data() });
  };

  render() {
    const { client } = this.state;
    const { classes, t } = this.props;

    if (!client) {
      return <div>Loading</div>
    }

    return (
      <Content>
        <ListItem className={classes.title}>
          <ListItemAvatar>
            <Avatar>
              <StoreIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={client.name}
            secondary={`${t('common.createdAt')} ${DateUtils.formatDate(client.createdAt)}`}
            primaryTypographyProps={{ style: { fontSize: '1.5rem' }}}
          />
        </ListItem>

        <Paper className={classes.card} elevation={5}>
          <CardHeader
            action={
              <Button variant="contained" color="secondary" size="large">
                {t('common.edit')}
              </Button>
            }
            title={t('clients.clientSheet')}
          />

          <CardContent>

            <List component="nav" aria-label="main mailbox folders">
              <ListItem>
                <ListItemIcon><StoreIcon /></ListItemIcon>
                <ListItemText primary={client.name} />
              </ListItem>

              <ListItem>
                <ListItemIcon><EmailIcon /></ListItemIcon>
                <ListItemText primary={client.email} />
              </ListItem>

              <ListItem>
                <ListItemIcon><PhoneIcon /></ListItemIcon>
                <ListItemText primary={client.phone} />
              </ListItem>

              <ListItem>
                <ListItemIcon><LocationIcon /></ListItemIcon>
                <ListItemText primary={`${client.address} - ${client.postalCode} ${client.city}, ${client.country}`} />
              </ListItem>
            </List>
          </CardContent>
        </Paper>
      </Content>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
})

export default connect(mapStateToProps)(
  translate()(
    withStyles(styles)(
      ClientDetailsPage,
    ),
  ),
);
