import React from 'react';
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
  const headers = ['Username', 'Email', 'Role', 'Confirmed'];
  return (
    <TableContainer component={Paper} className={classes.root}>
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
                  <Button>
                    <Edit />
                  </Button>
                  <Button>
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
