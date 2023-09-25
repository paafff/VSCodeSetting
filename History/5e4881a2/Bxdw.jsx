import React from 'react';
import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/Container';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div style={{ backgroundColor: '#2c3e50' }}>
        <Navbar />
        <Container className="">{children}</Container>
      </div>
    </React.Fragment>
  );
};

export default Layout;
