import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../redux/authSlice';
import blankProductImage from './../assets/blankprofile/logoPS.png';
import fongkir from './../assets/fongkir.png';

const PublicProductInfo = () => {
  const [infoProductImage, setInfoProductImage] = useState('');

  //dibawah ini usetate yang didalamnya berupa fungsi
  const [userData, setUserData] = useState({});
  const [productData, setProductData] = useState({});

  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  const user = useSelector(userAuthSelector);
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const getMeUser = async () => {
      await dispatch(getMe());
    };

    getMeUser();
  }, [dispatch]);

  const navigate = useNavigate();
  const { uuid } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/gproduct/${uuid}`
        );

        setUserData(response.data.user_id); // Simpan data pengguna dalam state userData
        setProductData(response.data); // Simpan data product dalam state userData

        // Konversi imageBuffer menjadi URL objek
        const imageBuffer = response.data.image.data; //masih bisa disingkat
        const blob = new Blob([new Uint8Array(imageBuffer)], {
          type: 'image/jpeg',
        });
        const imageUrl = URL.createObjectURL(blob);
        setInfoProductImage(imageUrl);
      } catch (error) {
        if (error.response) {
          navigate('/');
          alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
        } else {
          console.log(error); // Menampilkan error pada konsol
        }
      }
      // console.log(image);
      // console.log("id user", userData.id);
    };
    getProductById();
  }, [uuid, userData._id]);

  const addToCart = async () => {
    try {
      await axios.post(`http://localhost:5000/cart/add`, {
        cartUserId: user._id, //ingat, id pemilik session saat ini, bukan pemilik produk
        cartProductId: productData._id,
        // quantity: 1,  Ganti dengan jumlah produk yang ingin ditambahkan
      });
      alert('Berhasil menambahkan item ke dalam keranjang');
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
    <>
      <div className=" flex justify-center items-center py-5 ">
        <div className=" flex flex-col md:flex-row  w-full max-w-7xl p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 ">
          <div
            key=""
            className="flex justify-center rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
          >
            {/* <div className="h-full w-full flex flex-col justify-between"> */}
            <div className="h-96 w-96 relative flex items-center overflow-hidden rounded-xl">
              <img
                src={infoProductImage || blankProductImage}
                alt="prduct photo"
              />
            </div>
          </div>

          {/*  Profile Card */}
          <div className=" px-3 w-full text-black font-semibold pt-3 md:pt-0">
            <table class="table-auto h-full w-full ">
              <tbody className="h-full">
                <tr>
                  {/* <td>Product Name </td> */}
                  {/* <td className="pl-5">{userName}</td> */}
                  <td className="pl-5 text-xl font-bold">{productData.name}</td>
                </tr>
                <tr>
                  {/* <td>Description </td> */}
                  <td className="pl-5 text-sm">
                    <div style={{ whiteSpace: 'pre-line' }}>
                      {productData.description}
                    </div>
                  </td>
                </tr>
                <tr>
                  {/* <td>Price </td> */}
                  <td className="pl-5 text-lg font-bold text-blue-700 bg-white border-b-2 border-b-gray-200 ">
                    Rp. {productData.price}
                  </td>
                </tr>
              </tbody>

              <div className="flex justify-center">
                <img className="max-h-32" src={fongkir} />
              </div>

              <div className=" flex flex-row space-x-4">
                <button
                  type="button"
                  onClick={
                    user
                      ? addToCart
                      : () => {
                          navigate('/auth');
                        }
                  }
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tambah Keranjang
                </button>
                <Link
                  to={`https://api.whatsapp.com/send?phone=089503773770`}
                  target="_blank"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Beli Sekarang
                </Link>
              </div>
            </table>
          </div>
          {/* End Profile Card */}

          <div
            key=""
            className="flex justify-center rounded-xl bg-white p-3 shadow-lg hover:shadow-xl "
          >
            <div className="h-full w-60 flex flex-col justify-between">
              {/* <div className="h-96 w-96 relative flex items-center overflow-hidden rounded-xl">
                <img src={infoProductImage} alt="prduct photo" />
              </div> */}
              <div className="flex flex-row justify-between  border-b-2 border-b-gray-200 py-4">
                <div className="">
                  <p className="text-sm text-gray-500 font-medium">
                    Dijual oleh
                  </p>
                  <p className="text-lg font-bold">{userData.name}</p>
                </div>

                <Link
                  to={`https://api.whatsapp.com/send?phone=089503773770`}
                  target="_blank"
                  class="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-yellow-600 rounded hover:bg-white group"
                >
                  <span class="w-48 h-48 rounded rotate-[-40deg] bg-gray-700 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span class="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
                    Chat
                  </span>
                </Link>
              </div>

              <br />
              <div className="h-full">
                <table class="table-auto h-full w-full ">
                  <p className="text-sm text-gray-500 font-medium">
                    Pengembailan & Garansi
                  </p>
                  <tbody className="h-full">
                    <tr>
                      <td className="text-md font-semibold">
                        - Berubah Pikiran
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md font-semibold">
                        - Garansi Pengembalian Barang
                      </td>
                    </tr>
                    <tr>
                      <td className="text-md font-semibold">
                        - Garansi Pengembalian Uang
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <br />
              <div className="flex flex-row py-4 border-t-2 border-b-gray-200">
                <p className="h-full text-md font-semibold">Dikirm dari</p>
                <p className="text-md font-semibold px-1">
                  {userData.address || 'Indonesia'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicProductInfo;
