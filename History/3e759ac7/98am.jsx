import React from 'react';
import ppSaya from '../assets/ppSaya.png';
import { Link } from 'react-router-dom';

import {
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsPersonCircle,
  BsTelegram,
  BsWhatsapp,
} from 'react-icons/bs';

const HomeComponent = () => {
  return (
    <div className="py-20 h-full ">
      <div className="flex flex-col items-center justify-center">
        <div className="rounded-full w-1/5">
          <img className="rounded-full" src={ppSaya} alt="" />
        </div>
        <br />
        <div className="w-2/5 text-center font-sans ">
          <h1 className="text-4xl text-gray-300 font-sans font-bold px-3 py-2 rounded-md ">
            Hey there, I'm Danang Rifai
          </h1>
          <p className="text-lg text-gray-300 font-fontCabinetGrotesk px-3 py-2 rounded-md  font-medium">
            I am a computer science student who is highly passionate about
            technology, including both hardware and software aspects of
            computers. Not only that, but I'm also deeply interested in web
            development, Take a look at some of the
            <Link className="text-white hover:text-yellow-600 italic">
              {' '}
              "My Experiment"{' '}
            </Link>
            projects. Would you like to learn more about me? Click on{' '}
            <Link className="text-white hover:text-yellow-600 italic">
              {' '}
              "My Info"{' '}
            </Link>
          </p>
        </div>

        {/* sosmed */}
        <br />
        <div className="md:block">
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
        {/* sosmed */}
      </div>
    </div>
  );
};

export default HomeComponent;
