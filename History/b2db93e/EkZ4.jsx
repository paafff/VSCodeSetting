import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: 'user',
      });
      alert(response.data.msg);
      navigate('/');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  return (
    // <div className="flex justify-center items-center py-5">
    <div className="w-80 p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 className=" text-xl font-medium text-gray-900 dark:text-white">
        Form Register
      </h5>
      <br />
      <form className="space-y-2" onSubmit={registerUser}>
        <div>
          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Your Email
          </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@email.com"
            required
          />
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="********"
            required
          />
        </div>

        <div>
          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={(e) => setConfPassword(e.target.value)}
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="********"
            required
          />
        </div>
        {/* <br /> */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="remember_me"
            id="remember_me"
            className="mr-2 focus:ring-0 rounded"
            required
          />
          <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
            I accept the{' '}
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
            >
              terms
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
            >
              privacy policy
            </a>
          </label>
        </div>

        <br />
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
      </form>
    </div>
    // </div>
  );
};

export default RegisterForm;
