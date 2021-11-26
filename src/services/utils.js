const utils = {
  checkCart() {
    if (
      JSON.parse(localStorage.getItem("e-shop:cart")) == [] ||
      !localStorage.getItem("e-shop:cart")
    ) {
      localStorage.setItem("e-shop:cart", JSON.stringify([]));
    } else {
      return;
    }
  },
};

export default utils;
