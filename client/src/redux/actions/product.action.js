export const loadProduct = id => {
  return {
    type: "LOAD_PRODUCT_REQUEST",
    id
  };
};

export const loadProductSuccess = product => {
  return {
    type: "LOAD_PRODUCT_SUCCESS",
    product
  };
};
