import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosGet } from '../API/API';
import UserTable from '../components/tables/UserTable';

import { TablePagination } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  tableWrap: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    page: 0,
    rowsPerPage: 25,
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosGet(`users?limit=${pagination.rowsPerPage}&page=${pagination.page}`, dispatch).then(
      (res) => {
        setData(res.data.data);
      },
    );
  }, [dispatch, pagination]);

  const handleChangePage = (event, newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination({
      ...pagination,
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10),
    });
  };

  return (
    <div className={classes.tableWrap}>
      {data && <UserTable users={data.users} />}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data ? data.totalUsers : 25}
        rowsPerPage={pagination.rowsPerPage}
        page={pagination.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
