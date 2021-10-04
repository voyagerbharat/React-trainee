/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext, useContext } from 'react';
import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helper';

const Roomscontext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref(`rooms`);
    roomListRef.on('value', snap => {
      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });
    return () => {
      roomListRef.off();
    };
  });
  return (
    <Roomscontext.Provider value={rooms}>{children}</Roomscontext.Provider>
  );
};

export const useRooms = () => useContext(Roomscontext);
