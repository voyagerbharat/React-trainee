import React from 'react';
import { Icon, Button, Drawer } from 'rsuite';
import Dashboard from '.';
import { useModalState } from '../../misc/Custom-Hooks';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModalState();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
