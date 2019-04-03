import React, { Component, useState, useEffect } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { loadProduct } from "../../redux/actions/product.action";

const mapState = state => {
  return {
    idUser: state.loginRducer.user._id
  };
};

const Product = () => {
  const [product, setProduct] = useState([]);
  const Dispatch = useDispatch();
  const { idUser } = useMappedState(mapState);

  useEffect(() => {
    try {
      Dispatch(loadProduct(idUser));
    } catch (error) {
      console.log("voici error : ", error);
    }
  }, [idUser]);

  return (
    <div className="projet">
      <h1>hallo in my product</h1>
    </div>
  );
};

export default Product;
