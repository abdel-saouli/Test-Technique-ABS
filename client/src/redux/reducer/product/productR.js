export const productRducer = (state = [], action) => {
  switch (action.type) {
    case "LOAD_PRODUCT_SUCCESS":
      return [...state, ...action.product.data];
    default:
      return state;
  }
};
