import React from 'react';
import { translate } from 'react-polyglot';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, title, text, t }) => (
  <Dialog
    open={isOpen}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="default">
        {t('common.cancel')}
      </Button>
      <Button onClick={onConfirm} color="primary" autoFocus>
        {t('common.confirm')}
      </Button>
    </DialogActions>
  </Dialog>
);

export default translate()(
  ConfirmationDialog,
);
