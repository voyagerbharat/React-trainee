import React from 'react';
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../context/Profile.context';
import { database } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helper';
import EditableInput from '../EditableInput';
import AvatarUploadbtn from './AvatarUploadbtn';
import ProviderBlock from './ProviderBlock';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();
  // eslint-disable-next-line no-unused-vars
  const onSave = async newData => {
    try {
      const updates = await getUserUpdates(
        profile.uid,
        'name',
        newData,
        database
      );

      database.ref().update(updates);

      Alert.info('Successfully Updated!', 4000);
    } catch (err) {
      Alert.error(err, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          label={<h6 className="mb-2">Nickname</h6>}
          initialValue={profile.name}
          onSave={onSave}
        />
        <AvatarUploadbtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
