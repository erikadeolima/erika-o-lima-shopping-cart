const saveCartItems = (cartItemsOnLocal) => localStorage.setItem('cartItems', cartItemsOnLocal);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
