import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../misc/firebase';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    let UserRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        UserRef = database.ref(`/profiles/${authObj.uid}`);
        UserRef.on('value', snap => {
          const { name, createdAt } = snap.val();
          const data = {
            name,
            createdAt,
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
        setProfile(null);
        setisLoading(false);
      }
    });
    return () => {
      authUnsub();
      if (UserRef) {
        UserRef.off();
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
