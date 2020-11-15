import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
} from '@material-ui/core';

import { Edit, Delete } from '@material-ui/icons';
import { api } from '../../API/API';
import SubmitAlert from '../popups/SubmitAlert';
import EditUserPopUp from '../popups/EditUserPopUp';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  buttonGroup: {
    marginLeft: 'auto',
  },
  buttonsCeil: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function UserTable({ users }) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const headers = ['Username', 'Email', 'Role', 'Confirmed'];

  const deleteUserHandler = () => {
    setOpenModal(false);
    api.deleteData(`users/remove/${selected}`).then(() => window.location.reload());
  };
  const openModalHandler = (id) => {
    setSelected(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const editButtonHandler = (id) => {
    api.getData(`users/${id}`).then((res) => setEditUser(res.data.data));
  };
  console.log(editUser);
  const handleEditClose = () => {
    setEditUser(null);
  };
  return (
    <TableContainer component={Paper} className={classes.root}>
      <SubmitAlert
        type={0}
        handleClose={handleModalClose}
        deleteUser={deleteUserHandler}
        open={openModal}
      />
      {editUser && <EditUserPopUp user={editUser} handleClose={handleEditClose} />}
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {headers.map((item, i) => (
              <TableCell key={i} size="medium">
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(({ username, email, role, confirmed, _id }) => (
            <TableRow key={_id}>
              <TableCell>{username}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{role}</TableCell>
              <TableCell className={classes.buttonsCeil}>
                <span>{confirmed ? 'confirmed' : 'not confirmed'}</span>
                <ButtonGroup
                  variant="text"
                  aria-label="Edit and delete button group"
                  className={classes.buttonGroup}>
                  <Button onClick={() => editButtonHandler(_id)}>
                    <Edit />
                  </Button>
                  <Button onClick={() => openModalHandler(_id)}>
                    <Delete />
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
};

UserTable.defaultProps = {
  users: {},
};
