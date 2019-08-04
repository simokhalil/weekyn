import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/EmailOutlined';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/PhoneOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';

import Content from 'components/content/Content';
import ContentToolbar from 'components/content/ContentToolbar';
import * as DateUtils from '../../utils/date';
import { clientsDB } from '../../firebase';

const styles = {

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
        <ContentToolbar title={client.name} subtitle={`${t('common.createdAt')} ${DateUtils.formatDate(client.createdAt)}`} />

        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
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
        </Card>
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
