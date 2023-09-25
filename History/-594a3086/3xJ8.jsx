import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getMe } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import blankProductImage from './../assets/blankprofile/logoPS.png';

const CartProduct = () => {
  // const [productUserInCart, setProductUserInCart] = useState([]);
  // const [infoImage, setInfoImage] = useState('');
  // const { user_id } = useParams();
  // const { cartUser_id } = useParams();
  // const [infoUser, setInfoUser] = useState({});
  // const [infoProduct, setInfoProduct] = useState({});
  const [infoCart, setInfoCart] = useState([]);
  const [triggerUpdate, setTriggerUpdate] = useState(false); //triger useffect ketika button ditekan maka akan render ulang page

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductUserCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/cart');

      setInfoCart(response.data);

      response.data.forEach((cartProduk) => {
        // Konversi Buffer menjadi URL objek
        // jika tidak menggunakan (produk.image && produk.image.data) sebagai filter,maka akan terjadi error pada mapping pada data yang sebelumnya bernilai null = image
        if (cartProduk.cartProduct.image && cartProduk.cartProduct.image.data) {
          const buffer = cartProduk.cartProduct.image.data;
          const blob = new Blob([new Uint8Array(buffer)], {
            type: 'image/jpeg',
          });
          const imageUrl = URL.createObjectURL(blob);
          cartProduk.image = imageUrl;
        }
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      } else {
        console.log(error);
      }
    }
  };

  // mengambil nilai userAuthReducer pada store
  const userAuthSelector = (state) => state.userAuthReducer.userAuth;
  // dibawah ini operator || bekerja agar ketika page di refresh tidak terjadi eror karena state user belum terisi
  // dan ketika data state user belum terisi akan berisi string "Loading"
  const user = useSelector(userAuthSelector) || 'LoadingDataUser';
  // const user = useSelector(userAuthSelector) || "Loading";
  //dibawah ini adalah versi ringkasnya
  // const { user } = useSelector((state) => state.userAuthReducer);
  // delete product

  useEffect(() => {
    const getMeUser = async () => {
      await dispatch(getMe());
    };

    getMeUser();
  }, [dispatch]);

  // const { cartUser_id } = useParams();
  // const { cartProduct_id } = productUserInCart.cartProduct_id;
  const deleteProductCart = async (infocartid) => {
    try {
      // console.log("cartproductid" + infocartid);
      // console.log("userid" + user_id);
      await axios.delete(`http://localhost:5000/cart/${infocartid}`);
      // getProductUserCart();
      navigate('/cart');
      alert('produk sukses dihapus');
      // Ubah nilai state triggerUpdate, opsi pertama langsung direct, opsi kedua ribet pake arrow function,tapi lebih benar menggunakan opsi 2
      // setTriggerUpdate(true);
      setTriggerUpdate((trueValue) => !trueValue);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  useEffect(() => {
    const getProductOnCart = async () => {
      await getProductUserCart();
    };
    // console.log(user_id);
    getProductOnCart();
  }, [navigate, triggerUpdate]);

  return (
    <div class="flex flex-col justify-center space-y-2">
      {infoCart.map((cartProduk) => (
        <div class="px-2 flex flex-row space-x-1 md:space-x-5  space-y-0 rounded-xl max-w-xl w-full  mx-auto border border-white bg-gray-200 shadow-lg hover:shadow-xl hover:scale-105 duration-300">
          <div class="w-1/5  grid place-items-center">
            <Link to={`/product/info/${cartProduk.cartProduct.uuid}`}>
              <img
                src={cartProduk.image || blankProductImage}
                className="w-20 h-20 rounded-xl"
              />
            </Link>
          </div>
          <div class="w-full w-4/5  flex flex-col justify-between p-3">
            <Link to={`/product/info/${cartProduk.cartProduct.uuid}`}>
              <h3 class="font-bold text-gray-800 text-2xl">
                {cartProduk ? cartProduk.cartProduct.name : ''}
              </h3>
            </Link>
            <p class="text-sm font-semibold ">
              Rp. {cartProduk ? cartProduk.cartProduct.price : ''}
            </p>
            <div class="h-1/5 flex justify-end items-center">
              <button
                onClick={() => deleteProductCart(cartProduk.id)}
                type="submit"
                className="text-xs bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartProduct;
