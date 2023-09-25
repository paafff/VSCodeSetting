import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-none">
      <div className="max-w-5xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* kiri */}
          <div className="flex">
            <div className="flex items-center w-10 rounded-full">
              <Link to="/">
                <img src={ppSaya} alt="Avatar" className="rounded-full" />
              </Link>
            </div>
          </div>
          {/* <div> */}
          <div className="hidden md:block">
            <div className="ml-5 flex items-baseline space-x-4">
              <Link
                to={`/aboutme`}
                className="text-2xl text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
              >
                <div className="flex items-center">
                  <BsPersonCircle className="mr-2" />
                  <span className="align-middle">Store</span>
                </div>
              </Link>
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
                  <span className="align-middle">About</span>
                </div>
              </Link>
              {/* <div> */}
                <div className="bg-white dark:bg-gray-800 w-64 shadow ">
                  <div
                    onClick={() => setOpen(!open)}
                    className={`relative border-b-4 border-transparent py-3 ${
                      open
                        ? 'border-indigo-700 transform transition duration-300'
                        : ''
                    }`}
                  >
                    <div className="flex justify-center items-center space-x-3 cursor-pointer">
                      <div className="w-12 h-12 rounded-full overflow-hidden   ">
                        <img
                          src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-semibold dark:text-white text-gray-900 text-lg">
                        <div className="cursor-pointer">username</div>
                      </div>
                    </div>
                    {open && (
                      <div className="absolute w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent mt-5">
                        <ul className="space-y-3 dark:text-white">
                          <li className="font-medium">
                            <a
                              href="#"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                            >
                              <div className="mr-3">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              </div>
                              Account
                            </a>
                          </li>
                          <li className="font-medium">
                            <a
                              href="#"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-indigo-700"
                            >
                              <div className="mr-3">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                              </div>
                              Setting
                            </a>
                          </li>
                          <hr className="dark:border-gray-700" />
                          <li className="font-medium">
                            <a
                              href="#"
                              className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                            >
                              <div className="mr-3 text-red-600">
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                  />
                                </svg>
                              </div>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              {/* </div> */}
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
          </div> */}
          {/* kanan */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
