import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../redux/authSlice';
import blankProfileWhite from './../assets/blankprofile/blankwhite.png';

const EditUserForm = () => {
  const dispatch = useDispatch();

  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  const user = useSelector(userAuthSelector) ;
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);

  useEffect(() => {
    const getMeUser = async () => {
      await dispatch(getMe());
    };

    getMeUser();
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  // #############
  const [infoImage, setInfoImage] = useState('');
  const [infoUser, setInfoUser] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { uuid } = useParams();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${uuid}`);
        setInfoUser(response.data);

        // Konversi Buffer menjadi URL objek
        const buffer = response.data.image.data;
        const blob = new Blob([new Uint8Array(buffer)], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        setInfoImage(imageUrl);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
        } else {
          console.log(error); // Menampilkan error pada konsol
        }
      }
    };
    getUserById();
  }, [uuid]);

  const updateUserData = async (e) => {
    // e.preventDefault();
    try {
      const formUpdateData = new FormData();
      formUpdateData.append('name', name);
      formUpdateData.append('email', email);
      formUpdateData.append('address', address);
      formUpdateData.append('phone', phone);
      formUpdateData.append('gender', gender);
      formUpdateData.append('image', image);

      await axios.patch(
        `http://localhost:5000/userdata/${uuid}`,
        formUpdateData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(name);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  const updateUserPassword = async (e) => {
    // e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/userpassword/${uuid}`, {
        password: password,
        confPassword: confPassword,
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserData();
      await updateUserPassword();

      console.log(name);
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className=" flex flex-row flex-wrap p-3 ">
        <div className="mx-auto w-2/3">
          <br />
          {/* Profile Card */}
          <div className="">
            <div className="mx-auto max-w-sm md:max-w-3xl rounded-lg shadow-lg bg-gray-600 flex flex-row flex-wrap p-3 antialiased">
              <div className=" md:w-1/3 w-full">
                <img
                  className="rounded-lg "
                  src={
                    // user.image akan dipanggil setelah atau jika (user && user.image) tidak bernilai null
                    user && user.image ? user.image : blankProfileWhite
                  }
                  alt="Profile"
                />
              </div>
              <div className="md:w-2/3 px-12 flex flex-row flex-wrap justify-between">
                <div className=" text-white font-semibold relative pt-3 md:pt-0">
                  <table class="table-auto h-full">
                    <tbody className="">
                      <tr>
                        <td>Nama </td>
                        {/* <td className="pl-5">{userName}</td> */}
                        <td className="pl-5">{user.name}</td>
                      </tr>
                      <tr>
                        <td>Email </td>
                        <td className="pl-5">{user.email}</td>
                      </tr>
                      <tr>
                        <td>Alamat </td>
                        <td className="pl-5">{user.address}</td>
                      </tr>
                      <tr>
                        <td>No Hp </td>
                        <td className="pl-5">{user.phone}</td>
                      </tr>
                      <tr>
                        <td>Jenis Kelamin </td>
                        <td className="pl-5">{user.gender}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* End Profile Card */}

          <br />
          <div className=" flex justify-center items-center py-5 ">
            <div className="w-full max-w-2xl p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="max-w-full flex justify-between ">
                  <h5 className="mb-5 text-xl font-medium text-gray-900 dark:text-white">
                    Form Edit Data User
                  </h5>

                  <p className="mb-5 text-l italic font-light text-gray-900 dark:text-white">
                    *note : kosongkan field yang tidak diupdate
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div>
                    <label className=" mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Nama
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className=" mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>

                {/* 3 flex */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className=" mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Nomor HP
                    </label>
                    <input
                      type="number"
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="08123456789"
                    />
                  </div>

                  <div>
                    <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Jenis Kelamin
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      // value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Pilih jenis kelamin</option>
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                      Foto Profile
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                </div>
                {/* 3 flex */}

                {/* address */}
                <div>
                  <label className=" mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Alamat
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Surakarta"
                  />
                </div>
                {/* address */}

                {/* password */}
                <br />
                <br />
                <div className="max-w-full flex justify-between ">
                  <h5 className="place-self-center text-xl font-medium text-gray-900 dark:text-white">
                    Form Edit Password User
                  </h5>

                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className=" px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                  >
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                    <span className="relative group-hover:text-white">
                      {showPassword ? 'Hide' : 'Show'}
                    </span>
                  </button>
                </div>
                <div>
                  <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="********"
                  />
                </div>

                <div>
                  <label className="mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setConfPassword(e.target.value)}
                    className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="********"
                  />
                </div>

                {/* password */}

                <button
                  type="submit"
                  className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserForm;
