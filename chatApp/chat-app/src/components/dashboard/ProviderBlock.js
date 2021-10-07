/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Alert, Button, Icon, Tag } from 'rsuite';
import { auth } from '../../misc/firebase';

const ProviderBlock = () => {
  // eslint-disable-next-line no-unused-vars
  const [isConnected, setisConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const UpdateIsConnected = (providerId, value) => {
    setisConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You cannot disconnect from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      UpdateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const unLinkFacebook = () => {
    unlink('facebook.com');
  };
  const unLinkGoogle = () => {
    unlink('google.com');
  };

  const link = async provider => {
    try {
      await auth.signInWithPopup(provider);
      Alert.info(`Linked to ${provider.providerId}`, 4000);
      UpdateIsConnected(provider.providerId, true);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };
  const LinkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const LinkGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };
  return (
    <div>
      {isConnected['google.com'] && (
        <Tag closable color="green" onClose={unLinkGoogle}>
          <Icon icon="google" />
          Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag closable color="blue" onClose={unLinkFacebook}>
          <Icon icon="facebook" />
          Connected
        </Tag>
      )}
      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={LinkGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}
        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={LinkFacebook}>
            <Icon icon="facebook" /> Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
