import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="bg-gray-500 min-h-screen">
        <Navbar />
        <div className="">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
