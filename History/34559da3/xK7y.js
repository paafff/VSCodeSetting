import express from "express";
import {
  addProductCart,
  deleteProductCart,
  getCartByUserId,
} from "../controllers/Cart.js";
import { verifyUser } from "../middleware/Verify.js";

const cartRouter = express.Router();

cartRouter.get("/cart", verifyUser, getCartByUserId);
cartRouter.post("/cart/add", verifyUser, addProductCart);
cartRouter.delete("/cart/:infocart_id", verifyUser, deleteProductCart);

export default cartRouter;
