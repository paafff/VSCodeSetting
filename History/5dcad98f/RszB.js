import cartDB from "../models/CartModel.js";
import sharp from "sharp";

export const getCartByUserId = async (req, res) => {
  try {
    let findCart = await cartDB
      .find({
        cartUser_id: req.user_id,
      })
      .select("cartUser_id cartProduct_id quantity")
      .populate({ path: "cartProduct_id", select: "name price uuid image" })
      .populate({ path: "cartUser_id", select: "name address _id" });
    res.json(findCart);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const addProductCart = async (req, res) => {
  const { cartUser_id, cartProduct_id } = req.body;

  try {
    await cartDB.create({
      cartUser_id: cartUser_id,
      cartProduct_id: cartProduct_id,
    });
    res.status(200).json({ msg: "keranjang sukses ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};



export const deleteProductCart = async (req, res) => {
  // const { cartProduct_id } = req.body;

  try {
    const findUserAndProduct = await cartDB.findOne({
      _id: req.params.cartproduct_id,
    });

    if (!findUserAndProduct)
      return res.status(404).json({ msg: "produk pada cart tidak ditemukan" });

    await cartDB.deleteOne({
      _id: req.params.cartproduct_id,
    });

    res.status(200).json({ msg: "produk pada cart berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
