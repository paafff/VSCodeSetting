import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, reset, getMe } from '../redux/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uuid, setUuid] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

//   // mengambil nilai userAuthReducer pada store
//   const userAuthSelector = (state) => state.userAuthReducer.userAuth;
//   const userAuth = useSelector(userAuthSelector);
//   //dibawah ini adalah versi ringkasnya
//   // const { userAuth } = useSelector((state) => state.userAuthReducer);

//   useEffect(() => {
//     if (userAuth) {
//       // dispatch(getMe());
//       navigate(`/dashboard`);
//       // dispatch(getMe());
//     }
//     dispatch(reset());
//     // navigate("/dashboard");
//   }, [userAuth, dispatch, navigate]);

//   const authLogin = async (e) => {
//     e.preventDefault();
//     await dispatch(loginUser({ email, password }));
//   };

  return (
    <>
      <div className="w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        {/* {message && <p>{message}</p>} */}
        <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
          Form Login
        </h5>
        <br />
        <form className="space-y-2" onSubmit={'authLogin'}>
          <div>
            <label className=" mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Your Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@email.com"
              required
            />
          </div>

          <div>
            <label className=" mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="********"
              required
            />
          </div>
          <br />
          <div className=" ">
            <button
              type="submit"
              className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
