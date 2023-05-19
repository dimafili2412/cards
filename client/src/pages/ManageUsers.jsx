import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadAllUsers, selectAllUsers } from '../features/user/userSlice';
import Table from '../components/Table/Table';
import Button from '../components/Button/Button';
import PageTitle from '../components/PageTitle/PageTitle';
import api from '../api';
import styled from 'styled-components';
import Modal from '../components/Modal/Modal';
import useToast from '../hooks/useToast';

const TableContainer = styled.div`
  padding: 20px;
`;

const ManageUsers = () => {
  const dispatch = useDispatch();
  const showToast = useToast();
  const modalInitialState = { title: '', body: '', show: false, onOk: () => {}, onCancel: () => {} };
  const [deleteUserModal, setDeleteUserModal] = useState({ ...modalInitialState });
  useEffect(() => {
    dispatch(loadAllUsers());
  }, []);
  const users = useSelector(selectAllUsers);

  const handleDeleteUser = async (userId, firstName, lastName) => {
    setDeleteUserModal({
      title: 'Delete User',
      body: `Are you sure you want to delete the user ${firstName} ${lastName}`,
      show: true,
      onOk: async () => {
        try {
          const result = await api.delete(`/users/${userId}`);
          dispatch(loadAllUsers());
          showToast({
            text: (
              <div>
                User {firstName} {lastName} has been deleted succesfully.
              </div>
            ),
          });
        } catch (err) {
          showToast({
            text: (
              <div>
                Deleting user {firstName} {lastName} has failed.
              </div>
            ),
            color: 'error',
          });
        }
        setDeleteUserModal({ ...modalInitialState });
      },
      onCancel: () => {
        setDeleteUserModal({ ...modalInitialState });
      },
    });
  };

  const handleToggleBusiness = async (userId, business) => {
    try {
      const result = await api.patch(`/users/${userId}`, { business: business ? 0 : 1 });
    } catch (err) {
      showToast({
        text: <div>Error, failed to update suer data.</div>,
        color: 'error',
      });
    }
    dispatch(loadAllUsers());
  };

  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Email', key: 'email' },
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Phone', key: 'phone' },
    { title: 'Business', key: 'business' },
    { title: 'Admin', key: 'admin' },
    { title: 'Actions', key: 'actions' },
  ];
  const cellRender = (cell, rowIndex, columnKey, row) => {
    if (columnKey === 'actions') {
      return (
        <div>
          {row.admin ? null : <Button onClick={() => handleDeleteUser(row.id, row.firstName, row.lastName)}>Delete User</Button>}
          <Button onClick={() => handleToggleBusiness(row.id, row.business)}>Toggle Business</Button>
        </div>
      );
    }
    if (columnKey === 'admin' || columnKey === 'business') {
      if (cell) {
        return <div>X</div>;
      }
      return '';
    }
    return cell;
  };
  return (
    <div>
      <PageTitle title="Manage Users" />
      <TableContainer>
        <Table headers={headers} rows={users} cellRender={cellRender}></Table>
      </TableContainer>
      <Modal {...deleteUserModal} />
    </div>
  );
};

export default ManageUsers;
