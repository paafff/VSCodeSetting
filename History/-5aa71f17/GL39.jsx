import React from 'react';
import { Link } from 'react-router-dom';
import ppSaya from '../assets/ppSaya.png';
import { HiOutlineBeaker } from 'react-icons/hi';

import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsPersonCircle,
  BsTelegram,
  BsWhatsapp,
} from 'react-icons/bs';

const Navbar = () => {
  return (
    <nav className="bg-none">
      <div className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* kiri */}
          <div className="flex">
            <div className="flex items-center w-10 rounded-full">
              <Link to="/">
                <img src={ppSaya} alt="Avatar" className="rounded-full" />
              </Link>
            </div>

            {/* <div> */}
            <div className="hidden md:block">
              <div className="ml-5 flex items-baseline space-x-4">
                <Link
                  to={'/experiment'}
                  className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  <div className="flex items-center">
                    <HiOutlineBeaker className="mr-2" />
                    <span className="align-middle">Experiment</span>
                  </div>
                </Link>
                <Link
                  to={`/aboutme`}
                  className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                >
                  <div className="flex items-center">
                    <BsPersonCircle className="mr-2" />
                    <span className="align-middle">About Me</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* kanan */}
          {/* <div className="md:hidden">
            <div className=" flex  space-x-4">
              <Link
                target="blank"
                to={'https://github.com/paafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsGithub />
              </Link>

              <Link
                target="blank"
                to={'https://api.whatsapp.com/send?phone=089503773770'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsWhatsapp />
              </Link>
              <Link
                target="blank"
                to={'https://web.facebook.com/dpaafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsFacebook />
              </Link>
              <Link
                target="blank"
                to={'https://www.instagram.com/paafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsInstagram />
              </Link>
              <Link
                target="blank"
                to={'https://t.me/paafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsTelegram />
              </Link>
            </div>
          </div>

          {/* <div> */}
          <div className="hidden md:block">
            <div className=" flex  space-x-4">
              <Link
                target="blank"
                to={'https://github.com/paafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsGithub />
              </Link>

              <Link
                target="blank"
                to={'https://api.whatsapp.com/send?phone=089503773770'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsWhatsapp />
              </Link>
              <Link
                target="blank"
                to={'https://web.facebook.com/dpaafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsFacebook />
              </Link>
              <Link
                target="blank"
                to={'https://www.instagram.com/paafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsInstagram />
              </Link>
              <Link
                target="blank"
                to={'https://t.me/paafff'}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <BsTelegram />
              </Link>
            </div>
          </div>{' '}
          */}
          {/* kanan */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
