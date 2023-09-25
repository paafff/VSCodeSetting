import productDb from './../models/ProductModel.js';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import multer from 'multer';

// import userDb from "./../models/UserModel.js";
// import { productDb, userDb } from "../models/UserProductModel.js";

// disini
const upload = multer().single('image');

export const createProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      // Tangani kesalahan unggahan
      return res
        .status(500)
        .json({ msg: 'Terjadi kesalahan dalam unggahan file' });
    }

    const { name, price, description } = req.body;
    // const image = req.file.buffer;

    // const imageBuffer = await sharp(image)
    //   .jpeg()
    //   .resize({ width: 400, height: 400, fit: 'inside' })
    //   .toBuffer();

    try {
      await productDb.create({
        uuid: uuidv4(),
        name: name,
        price: price,
        description: description,
        user_id: req.user_id,
        // image: imageBuffer,
        image: req.file
          ? await sharp(req.file.buffer)
              .jpeg()
              .resize({ width: 400, height: 400, fit: 'inside' })
              .toBuffer()
          : undefined,
      });
      res.status(200).json({ msg: 'produk sukses ditambahkan' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// export const createProduct = async (req, res) => {

//   const { name, price, image } = req.body;

//   const imageBuffer = await sharp(image)
//     .jpeg()
//     .resize({ width: 500, height: 500 })
//     .toBuffer();
//   try {
//     await productDb.create({
//       uuid: uuidv4(),
//       name: name,
//       price: price,
//       image: imageBuffer,
//       user_id: req.user_id,
//     });
//     // console.log(req.body);
//     res.status(200).json({ msg: "produk sukses ditambahkan" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ msg: "Terjadi kesalahan dalam unggahan file" });
//     }

//     try {
//       const findProduct = await productDb.findOne({ uuid: req.params.uuid });
//       if (!findProduct) {
//         return res.status(404).json({ msg: "Produk tidak ditemukan" });
//       }

//       const { name, price, description } = req.body;
//       let image = findProduct.image;

//       if (req.file) {
//         // Jika ada file gambar baru yang diunggah, proses gambar baru
//         const newImage = req.file.buffer;

//         image = await sharp(newImage)
//           .jpeg()
//           .resize({ width: 400, height: 400, fit: "fill" })
//           .toBuffer();
//       }

//       if (req.role === "admin") {
//         await findProduct.updateOne(
//           { _id: findProduct._id },
//           { name: name, price: price, description: description, image: image }
//         );
//       } else {
//         await productDb.updateOne(
//           {
//             _id: findProduct._id,
//             user_id: req.user._id,
//           },
//           { name: name, price: price, description: description, image: image }
//         );
//       }

//       return res.status(200).json({ msg: "Produk berhasil diperbarui" });
//     } catch (error) {
//       console.log(error);
//       return res
//         .status(500)
//         .json({ msg: "Terjadi kesalahan dalam memperbarui produk" });
//     }
//   });
// };

export const updateProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'Terjadi kesalahan dalam unggahan file' });
    }

    try {
      const filterAdmin = { uuid: req.params.uuid };
      const filterUser = { uuid: req.params.uuid, user_id: req.user_id };
      const update = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.file
          ? await sharp(req.file.buffer)
              .jpeg()
              .resize({ width: 400, height: 400, fit: 'inside' })
              .toBuffer()
          : undefined,
      };

      if (req.role === 'admin') {
        await productDb.findOneAndUpdate(filterAdmin, update, { new: true });
      } else {
        const foundProduct = await productDb.findOne(filterUser);
        if (!foundProduct) {
          return res.status(404).json({ msg: 'Produk tidak ditemukan' });
        }

        if (foundProduct.user_id !== req.user_id) {
          return res.status(403).json({ msg: 'Akses tidak sah' });
        }

        await productDb.findOneAndUpdate(filterUser, update, { new: true });
      }

      res.status(200).json({ msg: 'Produk berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

// export const updateProduct = async (req, res) => {
//   try {
//     const filterAdmin = { uuid: req.params.uuid };
//     const filterUser = { uuid: req.params.uuid, user_id: req.user_id };
//     const update = {
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//     };

//     if (req.role === "admin") {
//       await productDb.findOneAndUpdate(filterAdmin, update, {
//         new: true, // Mengembalikan dokumen yang telah diperbarui
//       });
//     } else {
//       const foundProduct = await productDb.findOne(filterUser);
//       if (!foundProduct) {
//         return res.status(404).json({ msg: "Produk tidak ditemukan" });
//       }

//       if (foundProduct.user_id !== req.user_id) {
//         return res.status(403).json({ msg: "Akses tidak sah" });
//       }

//       await productDb.findOneAndUpdate(filterUser, update, {
//         new: true, // Mengembalikan dokumen yang telah diperbarui
//       });
//     }

//     res.status(200).json({ msg: "Produk berhasil diperbarui" });
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const deleteProduct = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({ uuid: req.params.uuid });

    if (!findProduct)
      return res.status(404).json({ msg: 'produk tidak ditemukan' });

    if (req.role === 'admin') {
      await productDb.deleteOne({ _id: findProduct._id });
    } else {
      // if (req.user_id !== findProduct.user_id)
      //   return res.status(403).json({ msg: "akses tidak sah" });
      await productDb.deleteOne({
        _id: findProduct._id,
        user_id: req.user_id,
      });
    }
    res.status(200).json({ msg: 'produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let response;
    if (req.role === 'admin') {
      response = await productDb.find().select('uuid name price').populate({
        path: 'user_id',
        select: 'name email',
      });
    } else {
      response = await productDb
        .find({ user_id: req.user_id })
        .select('uuid name price')
        .populate({
          path: 'user_id',
          select: 'name email',
        });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      uuid: req.params.uuid,
    });

    if (!findProduct)
      return res
        .status(404)
        .json({ msg: 'produk tidak ditemukan (getproductbyid)' });

    let response;
    if (req.role === 'admin') {
      response = await productDb
        .findOne({
          _id: findProduct._id,
        })
        .select('uuid name price description image _id')
        .populate({ path: 'user_id', select: 'name email address _id' });
    } else {
      response = await productDb
        .findOne({
          _id: findProduct._id,
          user_id: req.user_id,
        })
        .select('uuid name price description image _id')
        .populate({ path: 'user_id', select: 'name email address _id' });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getProductImageById = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      uuid: req.params.uuid,
    });

    if (!findProduct) {
      return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    }

    const imageBuffer = findProduct.image; // Buffer gambar dari database

    const jpegImageBuffer = await sharp(imageBuffer).jpeg().toBuffer();

    // Mengirim buffer gambar dalam format JPEG sebagai respons dengan header "Content-Type: image/jpeg"
    res.set('Content-Type', 'image/jpeg');
    res.send(jpegImageBuffer);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getPublicProducts = async (req, res) => {
//   try {
//     const products = await productDb.find().select("name price image");

//     const productData = products.map((product) => {
//       const { _id, name, price, image } = product;
//       return {
//         _id,
//         name,
//         price,
//         image: image.toString('base64') // Mengubah buffer menjadi base64 string
//       };
//     });

//     const response = {
//       products: productData,
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getPublicProducts = async (req, res) => {
  try {
    const response = await productDb
      .find()
      .select('name price image uuid')
      .populate({
        path: 'user_id',
        select: 'name email address phone',
      });
    // if (req.role === "admin") {
    //   response = await productDb.find().select("uuid name price").populate({
    //     path: "user_id",
    //     select: "name email",
    //   });
    // } else {
    //   response = await productDb
    //     .find({ user_id: req.user_id })
    //     .select("uuid name price")
    //     .populate({
    //       path: "user_id",
    //       select: "name email",
    //     });
    // }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getPublicProducts = async (req, res) => {
//   try {
//     const products = await productDb.find().select("name price image");

//     const productData = products.map((product) => {
//       const { _id, name, price, image } = product;

//       let imageBuffer = null;
//       if (image && image.data && image.data.buffer) {
//         const binaryData = image.data.buffer.toString("base64");
//         imageBuffer = Buffer.from(binaryData, "base64");
//       }

//       return {
//         _id,
//         name,
//         price,
//         image: imageBuffer,
//       };
//     });

//     const response = {
//       products: productData,
//     };

//     res.status(200).json(response);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// };

export const getPublicProductsImage = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({});

    if (!findProduct) {
      return res.status(404).json({ msg: 'Produk tidak ditemukan' });
    }

    const imageBuffer = findProduct.image; // Buffer gambar dari database

    const jpegImageBuffer = await sharp(imageBuffer).jpeg().toBuffer();

    // Mengirim buffer gambar dalam format JPEG sebagai respons dengan header "Content-Type: image/jpeg"
    res.set('Content-Type', 'image/jpeg');
    res.send(jpegImageBuffer);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getGlobalProductById = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      uuid: req.params.uuid,
    });

    if (!findProduct)
      return res
        .status(404)
        .json({ msg: 'produk tidak ditemukan (getproductbyid)' });

    let response = await productDb
      .findOne({
        _id: findProduct._id,
      })
      .select('uuid name price description image')
      .populate({ path: 'user_id', select: 'name email address' });
    // if (req.role === "admin") {
    //   response = await productDb
    //     .findOne({
    //       _id: findProduct._id,
    //     })
    //     .select("uuid name price description image")
    //     .populate({ path: "user_id", select: "name email address" });
    // } else {
    //   response = await productDb
    //     .findOne({
    //       _id: findProduct._id,
    //       user_id: req.user_id,
    //     })
    //     .select("uuid name price description image")
    //     .populate({ path: "user_id", select: "name email address" });
    // }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
