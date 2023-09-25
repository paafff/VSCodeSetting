import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartProduct from "../components/CartProduct";
import Layout from "./Layout";

const Cart = () => {
  const navigate = useNavigate();

  // //jika error maka akan dibalikin ke home
  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //     // alert("harap login terlebih dahulu");
  //   }
  // }, [isError]);
  return (
    <Layout>
      <br />
      <CartProduct />
    </Layout>
  );
};

export default Cart;
