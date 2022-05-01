const qSCartItems = document.querySelector('.cart__items');
const qSTotalPrice = document.querySelector('.total-price'); 

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function updateTotal(price) {
  const totalItens = parseFloat(localStorage.getItem('totalItens') || 0) 
  + parseFloat(price);
  localStorage.setItem('totalItens', totalItens.toFixed(2));
  qSTotalPrice.innerText = `Subtotal: $${totalItens.toFixed(2)}`;
}

function cartItemClickListener(event) {
  const price = event.target.innerText.split('| PRICE: $')[1].split('</li>');
  event.target.remove();
  saveCartItems(qSCartItems.innerHTML);
  updateTotal(parseFloat(price) * -1);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  /* const li = createCustomElement('li', 'cart__item', 
  `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`); */
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function putOnCart(event) {
  fetchItem(event.target.parentNode.firstChild.innerText).then((myItem) => {
    const { id, title, price } = myItem;
    const myItemOBject = { sku: id, name: title, salePrice: price };
    const myItemToBuy = createCartItemElement(myItemOBject);
    qSCartItems.appendChild(myItemToBuy);
    saveCartItems(qSCartItems.innerHTML);
    updateTotal(price);
  });
}

function emptyCart() {
  qSCartItems.innerHTML = '';
  qSTotalPrice.innerText = 'Subtotal: $ 0 ';
  localStorage.clear();
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const itemAddBtn = createCustomElement(
    'button',
    'item__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(itemAddBtn);
  itemAddBtn.addEventListener('click', putOnCart);
  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

async function principal() {
  const mySectionList = document.getElementsByClassName('items')[0];
  const getProducts = await fetchProducts('computador');
  getProducts.results.forEach((produto) => {
    const { id, title, thumbnail } = produto;
    const minhaLista = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    mySectionList.appendChild(minhaLista);
  });
  document.querySelector('.empty-cart').addEventListener('click', emptyCart);
}

/* Requisito 4 - getSavedCartItems */
function getLocal() {
  const itemLocal = getSavedCartItems('cartItems');
  qSCartItems.innerHTML = itemLocal;
  for (let i = 0; i < qSCartItems.children.length; i += 1) {
    const ideia = qSCartItems.children[i];
    ideia.addEventListener('click', cartItemClickListener);
  }
  const totalItens = (localStorage.getItem('totalItens') || 0);
  qSTotalPrice.innerText = `Subtotal: $${totalItens}`;
}

window.onload = () => {
  getLocal();
  principal();
};
