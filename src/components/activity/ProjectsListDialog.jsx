import PropTypes from 'prop-types';
import React from 'react';

import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import Content from 'components/content/Content';

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
    background: 'transparent linear-gradient(80deg, #3863a3 1%, #1a78cf 99%) repeat scroll 0% 0%',
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectsListDialog = ({ projects, isOpen, onClose, onSelect }) => {
  const classes = useStyles();

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Projects
          </Typography>
        </Toolbar>
      </AppBar>

        <Content>
        <div>Séléctionnez le projet à ajouter</div>

        <List>
          {projects.map((project, projectIndex) => (
            <React.Fragment key={projectIndex}>
              <ListItem button onClick={() => onSelect(project)}>
                <ListItemText primary={`${project.client && project.client.name} - ${project.name}`} secondary={project.tjm} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Content>
    </Dialog>
  )
}

ProjectsListDialog.propTypes = {
  projects: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

ProjectsListDialog.defaultProps = {
  projects: [],
  isOpen: false,
};

export default ProjectsListDialog;
