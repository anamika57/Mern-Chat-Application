import React, { useState } from 'react';
import Sidebar from '../Home/HomeComponents/Sidebar';
import MessageContainer from '../Home/HomeComponents/MessageContainer';

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  };

  return (
    <div className=' p-4  h-screen w-screen flex  justify-center'>
      {/* Sidebar Container */}
      <div className={`  w-full py-2 md:flex ${isSidebarVisible ? '' : 'hidden'}`}>
        <Sidebar onSelectUser={handleUserSelect} />
      </div>

      {/* Divider between Sidebar and Message Container */}
      <div 
        className={`divider divider-horizontal px-3 md:flex ${isSidebarVisible ? '' : 'hidden'} ${selectedUser ? 'block' : 'hidden'}`}
      ></div>

      {/* Message Container */}
      <div className={` w-1/2 flex-auto ${selectedUser ? '' : 'hidden md:flex'} bg-gray-200`}>
        <MessageContainer onBackUser={handleShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
