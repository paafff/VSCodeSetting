import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBeaker } from 'react-icons/hi';
import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsPersonCircle,
  BsTelegram,
  BsWhatsapp,
} from 'react-icons/bs';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const CustomNavbar = () => {
  return (
    <Navbar bg="none" expand="md">
      <Navbar.Brand>
        <Link to="/">
          anggap aja logo
          <img alt="Avatar" className="rounded-full" />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar" />
      <Navbar.Collapse id="navbar">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/aboutme">
            <div className="flex items-center">
              <BsPersonCircle className="mr-2" />
              <span className="align-middle">Store</span>
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/experiment">
            <div className="flex items-center">
              <HiOutlineBeaker className="mr-2" />
              <span className="align-middle">Experiment</span>
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/aboutme">
            <div className="flex items-center">
              <BsPersonCircle className="mr-2" />
              <span className="align-middle">About</span>
            </div>
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link target="_blank" href="https://github.com/paafff">
            <BsGithub />
          </Nav.Link>
          <Nav.Link
            target="_blank"
            href="https://api.whatsapp.com/send?phone=089503773770"
          >
            <BsWhatsapp />
          </Nav.Link>
          <Nav.Link target="_blank" href="https://web.facebook.com/dpaafff">
            <BsFacebook />
          </Nav.Link>
          <Nav.Link target="_blank" href="https://www.instagram.com/paafff">
            <BsInstagram />
          </Nav.Link>
          <Nav.Link target="_blank" href="https://t.me/paafff">
            <BsTelegram />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
