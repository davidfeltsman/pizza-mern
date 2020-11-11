import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { axiosGet } from '../API/API';

import { TableBody } from '@material-ui/core';

export default function Users() {
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axiosGet('users', dispatch).then((res) => {
      setUsers(res.data.data);
    });
  }, [dispatch]);
  console.log(users);
  return <></>;
}
