import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import blankProductImage from './../../assets/blankprofile/logoPS.png';

const PublicProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [infoImage, setInfoImage] = useState('');
  const [infoName, setInfoName] = useState('');
  const [infoPrice, setInfoPrice] = useState('');

  useEffect(() => {
    getPublicProducts();
  }, [navigate, infoImage]);

  const getPublicProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/publicproducts');
      setProducts(response.data);
      // Konversi Buffer menjadi URL objek
      // jika tidak menggunakan (produk.image && produk.image.data) sebagai filter,maka akan terjadi error pada mapping pada data yang sebelumnya bernilai null = image
      response.data.forEach((produk) => {
        if (produk.img1 && produk.img1.data) {
          const buffer = produk.img1.data;
          const blob = new Blob([new Uint8Array(buffer)], {
            type: 'image/jpeg',
          });
          const imageUrl = URL.createObjectURL(blob);
          produk.image = imageUrl;
          console.log('ini produk image', produk.image);
        }
      });
      // setInfoImage(imageUrl);
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
      <div className="flex flex-col justify-center">
        <div className="h-fit mx-auto max-w-6xl grid grid-cols-2 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((produk) => (
            <div
              key={produk.uuid}
              className=" max-w-xs rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:scale-105 duration-300"
            >
              <Link to={`/product/info/${produk.uuid}`}>
                <div className="h-full flex flex-col justify-between">
                  <div className="h-56 relative max-w-xs flex items-center overflow-hidden rounded-xl">
                    <img
                      src={produk.image || blankProductImage}
                      alt="product photo"
                    />
                  </div>

                  <div className="mt-1 p-2 ">
                    <h2 className="text-slate-900 font-bold text-md">
                      {produk.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                      {/* {produk.userDb.address || "Indonesia"} */}
                      "indonesia"
                    </p>

                    <div className="mt-3 flex items-end justify-between">
                      <p className="text-md font-bold text-slate-700">
                        Rp.{produk.price}
                      </p>

                      {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <span className="text-sm">View details</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PublicProduct;
