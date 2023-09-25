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
        <Nav class="ml-auto">
          <Nav.Link as={Link} to="/aboutme">
            <div class="flex items-center">
              <BsPersonCircle class="mr-2" />
              <span class="align-middle">Store</span>
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/experiment">
            <div class="flex items-center">
              <HiOutlineBeaker class="mr-2" />
              <span class="align-middle">Experiment</span>
            </div>
          </Nav.Link>
          <Nav.Link as={Link} to="/aboutme">
            <div class="flex items-center">
              <BsPersonCircle class="mr-2" />
              <span class="align-middle">About</span>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
