import { productDb, productImgDb } from '../models/ProductModel.js';
import userDb from '../models/UserModel.js';
import sharp from 'sharp';
import multer from 'multer';
// import { UUIDV4 } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const upload = multer().fields([
  { name: 'imgFilesOne', maxCount: 1 },
  { name: 'imgFilesTwo', maxCount: 1 },
  { name: 'imgFilesThree', maxCount: 1 },
]);

export const createProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      // Tangani kesalahan unggahan
      return res
        .status(500)
        .json({ msg: 'Terjadi kesalahan dalam unggahan file' });
    }

    const { name, price, description } = req.body;
    const productUUIDV4 = uuidv4();

    try {
      //penanganan image(misal ada yang kosong)
      const imgFilesOne = req.files['imgFilesOne']
        ? await sharp(req.files['imgFilesOne'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesTwo = req.files['imgFilesTwo']
        ? await sharp(req.files['imgFilesTwo'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesThree = req.files['imgFilesThree']
        ? await sharp(req.files['imgFilesThree'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;

      await productImgDb.create({
        uuid: productUUIDV4,
        userId: req.userId,
        name: name,
        img1: imgFilesOne,
        img1: imgFilesTwo,
        img1: imgFilesThree,
      });

      await productDb.create({
        uuid: productUUIDV4,
        userId: req.userId,
        name: name,
        price: price,
        description: description,
      });
      res.status(200).json({ msg: 'produk sukses ditambahkan' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

export const updateProduct = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(500)
        .json({ msg: 'maaf terjadi kesalahan pada unggahan file' });
    }

    try {
      const filterProduct = { uuid: req.params.uuid, userId: req.userId };

      const { name, price, description } = req.body;
      //penanganan image(misal ada yang kosong)
      const imgFilesOne = req.files['imgFilesOne']
        ? await sharp(req.files['imgFilesOne'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesTwo = req.files['imgFilesTwo']
        ? await sharp(req.files['imgFilesTwo'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;
      const imgFilesThree = req.files['imgFilesThree']
        ? await sharp(req.files['imgFilesThree'][0].buffer)
            .png()
            .resize({ width: 1000, height: 1000, fit: 'inside' })
            .toBuffer()
        : undefined;

      await productDb.update(
        { name: name, price: price, description: description },
        { where: filterProduct }
      );
      await productImgDb.update(
        {
          name: name,
          img1: imgFilesOne,
          img2: imgFilesTwo,
          img3: imgFilesThree,
        },
        { where: filterProduct }
      );

      res.status(200).json({ msg: 'produk sukses diperbarui' });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
};

const getProductByUUID = async (req, res) => {
  try {
    const findProduct = await productDb.findOne({
      where: { uuid: req.params.uuid, userId: req.userId },
      attributes: ['name', 'price', 'description', 'userId'],
    });

    const findProductImg = await productImgDb.findOne({
      where: { uuid: req.params.uuid, userId: req.userId },attributes:['img1','img2', 'img3']
    });
  } catch (error) {}
};
