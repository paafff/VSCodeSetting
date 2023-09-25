import express from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getPublicProducts,
  getGlobalProductById,
} from "./../controllers/Product.js";

import { verifyUser, verifyAdmin } from "./../middleware/Verify.js";

const productRouter = express.Router();

productRouter.get("/products", verifyUser, getAllProducts);
productRouter.get("/product/:uuid", verifyUser, getProductById);
productRouter.post("/product", verifyUser, createProduct);
productRouter.patch("/product/:uuid", verifyUser, updateProduct);
productRouter.delete("/product/:uuid", verifyUser, deleteProduct);

// public non auth tanpa verify middleware
productRouter.get("/publicproducts", getPublicProducts);
productRouter.get("/gproduct/:uuid", getGlobalProductById);

export default productRouter; 
