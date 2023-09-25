import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, logOut, getMe } from '../redux/authSlice';

const DashboardComponent = () => {
  const [infoImage, setInfoImage] = useState('');
  const [infoUser, setInfoUser] = useState({});

  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // dibawah ini operator || bekerja agar ketika page di refresh tidak terjadi eror karena state user belum terisi
  // dan ketika data state user belum terisi akan berisi string "Loading"
  const user = useSelector(userAuthSelector) || 'LoadingDataUser';
  // const user = useSelector(userAuthSelector) || "Loading";
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);

  // const { uuid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = async () => {
    await dispatch(logOut());
    await dispatch(reset());

    navigate('/');
  };

  useEffect(() => {
    const getMeUser = async () => {
      await dispatch(getMe());
    };

    getMeUser();
  }, [dispatch]);

  // useEffect(() => {
  //   const getUserById = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/user/${user.uuid}`
  //       );

  //       setInfoUser(response.data);

  //       // Konversi Buffer menjadi URL objek
  //       const buffer = response.data.image.data;
  //       const blob = new Blob([new Uint8Array(buffer)], { type: "image/jpeg" });
  //       const imageUrl = URL.createObjectURL(blob);
  //       setInfoImage(imageUrl);
  //     } catch (error) {
  //       if (error.response) {
  //         alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
  //       } else {
  //         console.log(error); // Menampilkan error pada konsol
  //       }
  //     }
  //   };
  //   getUserById();
  // }, [user, dispatch]);

  // product
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [navigate]);

  const deleteProduct = async (uuid) => {
    await axios.delete(`http://localhost:5000/product/${uuid}`);
    getAllProducts();
  };

  return (
    <>
      <div className="flex flex-row flex-wrap p-3 ">
        <div className="mx-auto w-2/3 flex flex-col place-items-center md:place-items-stretch">
          <br />
          {/* Profile Card */}
          <div className="flex justify-center">
            <div className=" max-w-fit md:max-w-3xl rounded-lg shadow-lg bg-gray-100 flex flex-row flex-wrap p-3 antialiased">
              <div className=" md:w-1/3 w-full">
                <img
                  className="rounded-lg "
                  src={
                    // user.image akan dipanggil setelah atau jika (user && user.image) tidak bernilai null
                    user.image
                  }
                  // src={
                  //   // user.image akan dipanggil setelah atau jika (user && user.image) tidak bernilai null
                  //   user && user.image ? user.image : blankProfileBlack
                  // }
                  alt="Profile"
                />
              </div>
              <div className="md:w-2/3 px-12 flex flex-row flex-wrap justify-between">
                <div className=" text-black font-semibold relative pt-3 md:pt-0">
                  <table class="table-auto h-full">
                    <tbody className="">
                      <tr>
                        <td>Nama </td>
                        <td className="pl-5">{user.name}</td>
                        {/* <td className="pl-5">{user? user.name : ""}</td> */}
                      </tr>

                      <tr>
                        <td>Email </td>
                        <td className="pl-5">{user.email}</td>
                        {/* <td className="pl-5">{user? user.email : ""}</td> */}
                      </tr>

                      <tr>
                        <td>Alamat </td>
                        <td className="pl-5">{user.address}</td>
                        {/* <td className="pl-5">{user? user.address : ""}</td> */}
                      </tr>

                      <tr>
                        <td>No Hp </td>
                        <td className="pl-5">{user.phone}</td>
                        {/* <td className="pl-5">{user? user.phone : ""}</td> */}
                      </tr>

                      <tr>
                        <td>Jenis Kelamin </td>
                        <td className="pl-5">{user.gender}</td>
                        {/* <td className="pl-5">{user? user.gender : ""}</td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* End Profile Card */}

          <br />
          <div className="flex flex-row justify-evenly w-full">
            <Link
              to={`/user/edit/${user.uuid}`}
              class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
            >
              <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
              <span class="relative group-hover:text-white">Edit Profile</span>
            </Link>

            <Link
              to="/product/add"
              class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
            >
              <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
              <span class="relative group-hover:text-white">Add Product</span>
            </Link>

            <button
              onClick={logoutUser}
              class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
            >
              <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
              <span class="relative group-hover:text-white">Logout</span>
            </button>
          </div>

          {/* Product List */}
          <div>
            <br />

            <table className="table w-full border">
              <thead className="text-left">
                <tr className="bg-gray-200 ">
                  <th className="py-2 px-4 ">No</th>
                  <th className="py-2 px-4 ">Nama Produk</th>
                  <th className="py-2 px-4 ">Harga</th>
                  <th className="py-2 px-4 ">Pemilik</th>
                  <th className="py-2 px-4 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {products.map((produk, index) => (
                  <tr
                    key={produk.uuid}
                    className={
                      (index + 1) % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                    }
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{produk.name}</td>
                    <td className="py-2 px-4">Rp. {produk.price}</td>
                    <td className="py-2 px-4">{produk.userDB.name}</td>
                    <td className="py-2 px-4 flex flex-row items-center justify-center space-x-2">
                      <Link
                        to={`/product/edit/${produk.uuid}`}
                        // href="#_"
                        class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                      >
                        <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                        <span class="relative group-hover:text-white">
                          Edit
                        </span>
                      </Link>
                      <button
                        onClick={() => deleteProduct(produk.uuid)}
                        class="px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-gray-200 text-black inline-block"
                      >
                        <span class="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-gray-600 group-hover:h-full opacity-90"></span>
                        <span class="relative group-hover:text-white">
                          delete
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <br />
          {/* Product List */}
        </div>
      </div>
    </>
  );
};

export default DashboardComponent;
