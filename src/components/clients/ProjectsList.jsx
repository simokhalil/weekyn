import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-polyglot';

import {
  CardHeader,
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

import Button from '../form/Button';
import Input from '../form/Input';
import SectionTitle from '../content/SectionTitle';
import * as DateUtils from '../../utils/date';
import * as ProjectsActions from '../../redux/actions/projects';

const styles = () => ({

});

const NEW_PROJECT_INITIAL_STATE = {
  name: '',
  tjm: 0,
};

class ProjectsList extends Component {
  state = {
    anchorEl: null,
    isAddingProject: false,
    newProject: {
      ...NEW_PROJECT_INITIAL_STATE,
    },
  };

  handleProjectMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleProjectMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  startAddingProject = () => {
    this.setState({ isAddingProject: true });
  };

  stopAddingProject = () => {
    this.setState({ isAddingProject: false });
  };

  handleNewProjectChange = (varName, value) => {
    const { newProject } = this.state;

    this.setState({
      newProject: {
        ...newProject,
        [varName]: value,
      },
    });
  };

  addProject = () => {
    const { newProject } = this.state;
    const { addProject, clientId } = this.props;

    try {
      addProject(clientId, { ...newProject });

      this.setState({
        newProject: { ...NEW_PROJECT_INITIAL_STATE },
        isAddingProject: false,
      });

    } catch (error) {
      console.log('Error adding project', error);
    }
  };

  render() {
    const { isAddingProject, newProject } = this.state;
    const { classes, t, projects } = this.props;

    console.log('projects', projects);

    return (
      <div>
        <CardHeader
          action={
            <Button variant="contained" color="secondary" size="small" onClick={this.startAddingProject}>
              {t('clients.addProject')}
            </Button>
          }
          title={<SectionTitle label={t('clients.projects')} />}
        />



        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">TJM</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {!projects && !isAddingProject && (
                <TableRow>
                  <TableCell>
                    Loading...
                  </TableCell>
                </TableRow>
              )}

              {projects && !projects.length && !isAddingProject && (
                <TableRow>
                  <TableCell>
                    Vous n'avez aucun projet pour ce client
                  </TableCell>
                </TableRow>
              )}

              {projects && projects.map((project, projectIndex) => (
                <TableRow key={projectIndex}>
                  <TableCell component="th" scope="row">
                    <ListItemText primary={project.name} secondary={`${t('common.createdAt')} ${DateUtils.formatDate(project.createdAt)}`} />
                  </TableCell>
                  <TableCell align="right">{project.tjm}</TableCell>
                  <TableCell align="right">
                    <>
                      <IconButton aria-controls={`action-menu-${project.id}`} aria-haspopup="true" edge="end" aria-label="Edit project" onClick={this.handleProjectMenuOpen}>
                        <MoreHorizIcon />
                      </IconButton>

                      <Menu
                        id={`action-menu-${project.id}`}
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleProjectMenuClose}
                      >
                        <MenuItem onClick={this.handleProjectMenuClose} style={{ fontSize: '0.8rem' }}>Modifier</MenuItem>
                        <MenuItem onClick={this.handleProjectMenuClose} style={{ fontSize: '0.8rem' }}>Archiver</MenuItem>
                      </Menu>
                    </>
                  </TableCell>
                </TableRow>

              ))}
            </>
            {isAddingProject && (
              <TableRow>
                <TableCell component="th" scope="row">
                  <Input
                    label={t('clients.projectName')}
                    value={newProject.name}
                    onChange={(value) => this.handleNewProjectChange('name', value)}
                  />
                </TableCell>

                <TableCell align="right">
                  <Input
                    type="number"
                    label={t('clients.tjm')}
                    value={newProject.tjm}
                    onChange={(value) => this.handleNewProjectChange('tjm', value)}
                    style={{ display: 'inline-block', width: 'auto' }}
                  />
                </TableCell>

                <TableCell align="right">
                  <Button variant="contained" color="secondary" size="small" onClick={this.addProject}>
                    {t('common.save')}
                  </Button>
                </TableCell>

              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

ProjectsList.propTypes = {
  addProject: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  clientId: PropTypes.string.isRequired,
  projects: PropTypes.array,
  t: PropTypes.func.isRequired,
};

ProjectsList.defaultProps = {
  projects: [],
};

export default withStyles(styles)(
  translate()(
    connect(null, ProjectsActions)(
      ProjectsList,
    ),
  ),
);