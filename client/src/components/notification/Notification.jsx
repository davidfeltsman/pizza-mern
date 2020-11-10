import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarContent, useSnackbar } from 'notistack';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = React.forwardRef((props, ref) => {
  const { closeSnackbar } = useSnackbar();
  const handleClose = () => {
    closeSnackbar(props.id);
  };

  return (
    <SnackbarContent ref={ref}>
      <Alert severity={props.status} onClose={handleClose}>
        {props.message}
      </Alert>
    </SnackbarContent>
  );
});

export default Notification;
