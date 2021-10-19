import React, { createContext, useState, useContext, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, database } from '../misc/firebase';

export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    let UserRef;
    let userStatusRef;

    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        UserRef = database.ref(`/profiles/${authObj.uid}`);
        UserRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();
          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(data);
          setisLoading(false);
        });
      } else {
        if (UserRef) {
          UserRef.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
        database.ref('.info/connected').off();
        setProfile(null);
        setisLoading(false);
      }
    });

    database.ref('.info/connected').on('value', snapshot => {
      // If we're not currently connected, don't do anything.
      if (!!snapshot.val() === false) {
        return;
      }

      userStatusRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          userStatusRef.set(isOnlineForDatabase);
        });
    });

    return () => {
      database.ref('.info/connected').off();
      authUnsub();
      if (UserRef) {
        UserRef.off();
      }
      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
