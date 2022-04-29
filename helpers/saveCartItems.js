const saveCartItems = (cartItemsOnLocal) => localStorage.setItem('items', cartItemsOnLocal);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
