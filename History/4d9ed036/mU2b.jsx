import React, { useEffect, useState } from 'react';
import ppSaya from './../assets/ppSaya.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState('');
  // const [userDataGetme, setUserDataGetme] = useState('');

  const navigate = useNavigate();

  const authLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        // email: email,
        // password: password,
        email: 'danang050402@gmail.com',
        password: '@paafff050402D',
      });
      // navigate('/article/create');

      // setUserData(response.data);
      console.log(response.data.msg);
    } catch (error) {
      //dibawah ini opsi tampilkan error
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  const getMe = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getme');

      setUserData(response.data);
    } catch (error) {
      //dibawah ini opsi tampilkan error
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  // useEffect(() => {
  //   if (userData) {
  //     navigate('/articles');
  //   }
  //   console.log(userData);
  // }, [navigate]);

  const logOut = async () => {
    await axios.delete('http://localhost:5000/logout');
    alert('sukses logout');
    navigate('/');
  };

  return (
    <>
      <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
        <div className="flex flex-col items-center h-full p-10 ">
          {/* content */}
          <div className="max-w-lg g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-full">
                    <div className="md:mx-6 md:p-12">
                      {/* <!--Logo--> */}
                      <div className="text-center">
                        <img
                          className="mx-auto w-48 rounded-full"
                          src={ppSaya}
                          // src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                          alt="Logo"
                        />
                        <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                          We are The paafff Team
                        </h4>
                      </div>

                      <form className="" onSubmit={authLogin}>
                        <p className="mb-6">Please login to your account</p>

                        <div className="space-y-3">
                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="email"
                              name="email"
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400 focus:outline-none  "
                              placeholder="Email"
                            />
                            <label
                              // for="email"
                              className="absolute left-0 -top-2.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Email
                            </label>
                          </div>

                          <div className="relative">
                            <input
                              autoComplete="off"
                              id="password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="bg-transparent peer placeholder-transparent h-10 w-full border-b border-gray-300 focus:border-yellow-400  focus:outline-none "
                              placeholder="Password"
                            />
                            <label
                              // for="password"
                              className="absolute left-0 -top-2.5 text-white text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2.5 transition-all peer-focus:-top-2.5 peer-focus:text-yellow-500 peer-focus:text-sm"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <br />
                        {/* <!--Username input--> */}
                        {/* <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="name@email.com"
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          email
                        </label>
                      </div> */}

                        {/* <!--Password input--> */}
                        {/* <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="*********"
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Password
                        </label>
                      </div> */}

                        {/* <!--Submit button--> */}
                        <div className="mb-12 pb-1 pt-1 text-center">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            style={{
                              background:
                                'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                            }}
                          >
                            Log in
                          </button>

                          {/* <!--Forgot password link--> */}
                          <a href="#!">Forgot password?</a>
                        </div>

                        {/* <!--Register button--> */}
                        <div className="flex items-center justify-between pb-6">
                          <p className="mb-0 mr-2">Don't have an account?</p>
                          <button
                            // type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            Register
                          </button>
                        </div>
                      </form>

                      <button
                        onClick={logOut}
                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        style={{
                          background:
                            'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>

                  {/* <!-- Right column container with background and description-->
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* content */}
        </div>
      </section>
      <div>
        <button
          onClick={getMe}
          className="mb-3 inline-block max-w-sm rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          style={{
            background:
              'linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)',
          }}
        >
          getme
        </button>
        <p>nama : {userData.name}</p>
        <p>email : {userData.email}</p>
        <p>role : {userData.role}</p>
      </div>
    </>
  );
};

export default LoginForm;
