import productDb from './../models/ProductModel.js';
import sharp from 'sharp';
import multer from 'multer';
import { where } from 'sequelize';
import userDb from '../models/UserModel.js';
import { response } from 'express';
// import gambarsy from "./../../xdummyassets/1.jpg";

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

    // dibawah ini hanya opsi on kan ketika frontend jadi untuk upload foto, tetapi ketika field foto tidak du upload
    // maka akan terjadi eror, oleh sebab itu kita gunakan atau kuita define langsung pada trycatch blok dibawah dengan tertnary op
    // const image = req.file.buffer ;
    // const imageBuffer = await sharp(image)
    //   .jpeg()
    //   .resize({ width: 400, height: 400, fit: "inside" })
    //   .toBuffer();

    try {
      await productDb.create({
        name: name,
        price: price,
        description: description,
        userId: req.userid,
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

  //dibawah ini test simple tanpa image

  //   const { name, price, description } = req.body;
  //   try {
  //     await productDb.create({
  //       name: name,
  //       price: price,
  //       description: description,
  //       // image: imageBuffer,
  //       userId: req.userid,
  //     });
  //     res.status(200).json({ msg: "produk sukses ditambahkan" });
  //   } catch (error) {
  //     res.status(500).json({ msg: error.message });
  //   }
  // });
};

export const updateProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'Terjadi kesalahan dalam unggahan file' });
    }

    try {
      const filterProductAdmin = { uuid: req.params.uuid };
      const filterProductUser = { uuid: req.params.uuid, userId: req.userid };

      const { name, price, description } = req.body;
      const updateField = {
        name: name || findProduct.name,
        price: price || findProduct.price,
        description: description || findProduct.description,
        image: req.file
          ? await sharp(req.file.buffer)
              .jpeg()
              .resize({ width: 400, height: 400, fit: 'inside' })
              .toBuffer()
          : undefined,
      };

      //update function
      if (req.role === 'admin') {
        await productDb.update(updateField, { where: filterProductAdmin });
      } else {
        const findProduct = await productDb.findOne({
          where: filterProductUser,
        });
        if (!findProduct) {
          return res.status(404).json({ msg: 'Produk tidak ditemukan' });
        }

        if (findProduct.userId !== req.userid) {
          return res.status(403).json({ msg: 'Akses tidak sah' });
        }

        await productDb.update(updateField, {
          where: filterProductUser,
        });
      }

      res.status(200).json({ msg: 'Produk berhasil diperbarui' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

export const deleteProduct = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      where: { uuid: req.params.uuid },
    });

    if (!findProduct)
      return res.status(404).json({ msg: 'produk tidak ditemukan' });

    if (req.role === 'admin') {
      await productDb.destroy({ where: { id: findProduct.id } });
    } else {
      if (req.userid !== findProduct.userId)
        return res.status(403).json({ msg: 'akses tidak sah' });
      await productDb.destroy({
        where: { id: findProduct.id, userId: req.userid },
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
      response = await productDb.findAll({
        attributes: ['uuid', 'name', 'price'],
        include: [
          {
            model: userDb,
            as: 'userDB',
            attributes: ['name', 'email', 'address'],
          },
        ],
      });
    } else {
      //filter user
      response = await productDb.findAll({
        where: { userId: req.userid },
        attributes: ['uuid', 'name', 'price'],
        include: [
          {
            model: userDb,
            as: 'userDB',
            attributes: ['name', 'email', 'address'],
          },
        ],
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
      where: { uuid: req.params.uuid },
    });

    if (!findProduct)
      return res
        .status(404)
        .json({ msg: 'produk tidak ditemukan (getproductbyid)' });

    let response;
    if (req.role === 'admin') {
      response = await productDb.findOne({
        where: { id: findProduct.id },
        attributes: [
          'id',
          'uuid',
          'name',
          'price',
          'description',
          'image',
          'userId',
        ],
        include: [
          {
            model: userDb,
            as: 'userDB',
            attributes: ['name', 'email', 'address', 'id'],
          },
        ],
      });

      // .select("uuid name price description image _id")
      // .populate({ path: "user_id", select: "name email address _id" });
    } else {
      response = await productDb.findOne({
        where: { id: findProduct.id, userId: req.userid },
        attributes: [
          'id',
          'uuid',
          'name',
          'price',
          'description',
          'image',
          'userId',
        ],
        include: [
          {
            model: userDb,
            as: 'userDB',
            attributes: ['name', 'email', 'address', 'id'],
          },
        ],
      });

      // .select("uuid name price description image _id")
      // .populate({ path: "user_id", select: "name email address _id" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPublicProducts = async (req, res) => {
  try {
    const response = await productDb.findAll({
      attributes: ['name', 'price', 'image', 'uuid'],
      include: [
        {
          model: userDb,
          as: 'userDB',
          attributes: ['name', 'email', 'address', 'phone'],
        },
      ],
    });

    //dibawah ini ga kepake

    // .find()
    // .select("name price image uuid")
    // .populate({
    //   path: "user_id",
    //   select: "name email address phone",
    // });
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

export const getGlobalProductById = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      where: { uuid: req.params.uuid },
    });

    if (!findProduct)
      return res
        .status(404)
        .json({ msg: 'produk tidak ditemukan (getproductbyid)' });

    let response = await productDb.findOne({
      where: { id: findProduct.id },
      attributes: [
        'uuid',
        'name',
        'price',
        'description',
        'image',
        'id',
        'userId',
      ],
      include: [
        {
          model: userDb,
          as: 'userDB',
          attributes: ['id', 'name', 'email', 'address', 'phone'],
        },
      ],
    });

    //dibawah ini ga kepake

    // .select("uuid name price description image")
    // .populate({ path: "user_id", select: "name email address" });
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
