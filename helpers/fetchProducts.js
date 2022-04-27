const fetchProductsUrl = (produto) => `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;

const fetchProducts = async (produto) => {
  try {
    const url = fetchProductsUrl(produto);
    const response = await fetch(url);
    const data = await response.json();
    /* const produtos = data.results; */
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
