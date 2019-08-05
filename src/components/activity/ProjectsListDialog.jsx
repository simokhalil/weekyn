import PropTypes from 'prop-types';
import React from 'react';

import {
  AppBar,
  Button,
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

const useStyles = makeStyles({
  appBar: {
    position: 'relative',
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
      <List>
        {projects.map((project, projectIndex) => (
          <React.Fragment key={projectIndex}>
            <ListItem button onClick={() => onSelect(project)}>
              <ListItemText primary={project.name} secondary={project.tjm} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
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
