import React, { useState, useRef, useEffect } from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import ChatRoomList from './rooms/ChatRoomList';
import DashboardToggle from './dashboard/DashboardToggle';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider style={{ margin: 0, padding: '30px 0' }}>
          Join Conversation
        </Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
