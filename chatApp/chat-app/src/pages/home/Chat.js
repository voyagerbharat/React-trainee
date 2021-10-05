import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import Bottom from '../../components/chat-window/bottom/Index';
import Messages from '../../components/chat-window/messages/Index';
import Top from '../../components/chat-window/top/Index';
import { CurrentRoomProvider } from '../../context/current-room-context';
import { useRooms } from '../../context/rooms.context';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();
  if (!rooms) {
    return <Loader vertical center size="md" content="Loading" speed="slow" />;
  }
  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    console.log(chatId, ' ');
    return <h6 className="text-center mt-page">chat {chatId} not found</h6>;
  }
  const { name, description } = currentRoom;
  const currentRoomData = { name, description };
  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <Top />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <Bottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
