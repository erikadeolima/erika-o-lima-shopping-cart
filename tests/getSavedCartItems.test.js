const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it('Teste se, ao executar `getSavedCartItems`, o método `localStorage.getItem` é chamado;', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);/* testa quantas vezes meu local storage é chamado */
  });
  it('Teste se, ao executar `getSavedCartItems`, o método `localStorage.getItem` é chamado com o `cartItems` como parâmetro.', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
