/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { Loader, Nav } from 'rsuite';
import { Link, useLocation } from 'react-router-dom';
import { useRooms } from '../../context/rooms.context';
import RoomItem from './RoomItem';

const chatRoomList = ({ aboveElHeight }) => {
  const rooms = useRooms();
  const location = useLocation();

  return (
    <Nav
      appearance="subtle"
      vertical
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader center vertical content="Loading" speed="slow" size="md" />
      )}
      {rooms &&
        rooms.length > 0 &&
        rooms.map(room => (
          <Nav.Item
            componentClass={Link}
            eventKey={`/chats/${room.id}`}
            key={room.id}
            to={`/chats/${room.id}`}
          >
            <RoomItem room={room} />
          </Nav.Item>
        ))}
    </Nav>
  );
};

export default chatRoomList;
