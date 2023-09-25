import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import blankProductImage from './../assets/blankprofile/logoPS.png';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('description', description);

      await axios.post('http://localhost:5000/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg); // Menampilkan pesan error sebagai popup
      } else {
        console.log(error); // Menampilkan error pada konsol
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <div className="mx-auto w-2/3">
        {/* <!--Title--> */}
        <h2 className="font-sans font-bold break-normal text-gray-300  py-4 text-2xl">
          Tambah Produk
        </h2>
        {/* <!--Card--> */}
        <div
          id="section2"
          className="p-8 mt-6 lg:mt-0 rounded shadow bg-slate-200"
        >
          <form onSubmit={addProduct}>
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textfield"
                >
                  Nama Produk
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Nama Produk"
                  required
                />
                <p className="py-2 text-sm text-gray-600">
                  Tulis nama produkmu agar mudah dicari oleh pembeli
                </p>
              </div>
            </div>

            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textfield"
                >
                  Harga Produk
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Rp. -"
                  required
                />
                <p className="py-2 text-sm text-gray-600">
                  Tulis harga produkmu tanpa menggunakan titik. Contohnya, 1000
                  bukan 1.000
                </p>
              </div>
            </div>

            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textarea"
                >
                  Text Area
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  className="form-textarea block w-full focus:bg-white"
                  id="my-textarea"
                  value={description}
                  rows="8"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <p className="py-2 text-sm text-gray-600">
                  Tulis deskripsi produkmu min. 100 karakter agar pembeli
                  semakin mudah mengerti.
                </p>
              </div>
            </div>

            {/* gambar */}
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-file"
                >
                  Gambar Produk
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  id="my-file"
                  name="image"
                  accept="image/*"
                  // required
                />
                <p className="py-2 text-sm text-gray-600">
                  Pilih gambar produk (format: JPG, PNG, atau GIF)
                </p>
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/3"></div>
              <div className="md:w-2/3">
                {/* button */}
                <button className="" type="submit">
                  <a
                    href="#_"
                    class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-gray-800 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
                  >
                    <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-gray-800 group-hover:h-full"></span>
                    <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                      <svg
                        class="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                      <svg
                        class="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                      Simpan
                    </span>
                  </a>
                </button>
                {/* button */}
              </div>
            </div>
          </form>
        </div>
        {/* <!--/Card--> */}
      </div>
    </>
  );
};

export default AddProductForm;
