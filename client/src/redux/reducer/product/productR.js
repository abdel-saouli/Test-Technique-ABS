export const productRducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case "LOAD_PRODUCT_SUCCESS":
      console.log("product ", action.product);

      return { products: [...state.products, ...action.product] };
    default:
      return state;
  }
};
