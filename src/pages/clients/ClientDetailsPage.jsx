import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  withStyles,
  Paper,
} from '@material-ui/core';

import EmailIcon from '@material-ui/icons/EmailOutlined';
import LocationIcon from '@material-ui/icons/LocationOnOutlined';
import PhoneIcon from '@material-ui/icons/PhoneOutlined';
import StoreIcon from '@material-ui/icons/StoreOutlined';

import Button from '../../components/form/Button';
import Content from 'components/content/Content';
import ProjectsList from 'components/clients/ProjectsList';
import SectionTitle from 'components/content/SectionTitle';
import * as DateUtils from '../../utils/date';
import * as ProjectActions from '../../redux/actions/projects';
import { clientsDB, projectsDB } from '../../firebase';

const styles = {
  title: {
    marginBottom: '30px',
  },
  card: {
    marginBottom: '30px',
  },
};

class ClientDetailsPage extends Component {
  state = {
    clientId: null,
    client: null,
    projects: null,
  };

  projetctsSpnapshotListener = null;

  componentDidMount() {
    this.getClient();
  }

  componentWillUnmount() {
    if (this.projetctsSpnapshotListener) {
      this.projetctsSpnapshotListener();
    }
  }

  getClient = async () => {
    const { currentUser } = this.props;
    const { match, getProjects } = this.props;

    const clientId = match.params.id;

    const client = await clientsDB.getClient(currentUser.uid, clientId);

    getProjects(clientId);

    this.setState({
      client: client.data(),
      clientId,
    });
  };

  render() {
    const { client, clientId } = this.state;
    const { classes, projects, t } = this.props;

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
            primaryTypographyProps={{ style: { fontSize: '1.5rem' } }}
          />
        </ListItem>

        <CardHeader
          action={
            <Button variant="contained" color="secondary" size="small">
              {t('common.edit')}
            </Button>
          }
          title={<SectionTitle label={t('clients.clientSheet')} />}
        />

        <Paper className={classes.card} elevation={0}>
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


        <ProjectsList projects={projects} clientId={clientId} />

      </Content>
    )
  }
}

ClientDetailsPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  currentUser: state.users.authUser,
  projects: state.projects.projects,
})

export default connect(mapStateToProps, ProjectActions)(
  translate()(
    withStyles(styles)(
      ClientDetailsPage,
    ),
  ),
);
