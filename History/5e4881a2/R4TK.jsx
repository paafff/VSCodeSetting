import React from 'react';
import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/Container';

const Layout = ({ children }) => {
  const containerStyle = {
    paddingTop: 0, // Adjust as needed
    paddingBottom: 0, // Adjust as needed
    paddingLeft: 0, // Adjust as needed
    paddingRight: 0, // Adjust as needed
  };

  return (
    <React.Fragment>
      <div style={{ backgroundColor: '#2c3e50', minHeight: '100vh' }}>
        <Navbar />
        <Container style={containerStyle}>{children}</Container>
      </div>
    </React.Fragment>
  );
};

export default Layout;
