import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="">
        <Navbar />
        <div className="bg-blue-200 min-h-screen pt-20">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
