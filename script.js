const qSCartItems = document.querySelector('.cart__items');

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const itemAddBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(itemAddBtn);
  itemAddBtn.addEventListener('click', putOnCart);
  return section;
}

/* function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
} */

function cartItemClickListener(event) {
 event.target.remove();
 saveCartItems(qSCartItems.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function putOnCart(event) {
  const myItem = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { id, title, price } = myItem;
  const myItemOBject = { sku: id, name: title, salePrice: price };
  const myItemToBuy = createCartItemElement(myItemOBject);
  qSCartItems.appendChild(myItemToBuy);
  saveCartItems(qSCartItems.innerHTML);
}

async function principal() {
  const mySectionList = document.getElementsByClassName('items')[0];
  const getProducts = await fetchProducts('computador');
  getProducts.results.forEach((produto) => {
    const { id, title, thumbnail } = produto;
    const minhaLista = createProductItemElement({ sku: id, name: title, image: thumbnail });
    mySectionList.appendChild(minhaLista);
  });
}
/* Requisito 4 - getSavedCartItems */
function getLocal() {
  const itemLocal = getSavedCartItems('cartItems');
  qSCartItems.innerHTML = itemLocal;
  for (let i = 0; i < qSCartItems.children.length; i += 1) {
    const ideia = qSCartItems.children[i];
    ideia.addEventListener('click', cartItemClickListener);
  }
}

/* async function sumMyCartItems() {
  let sum;
  const myShop = await fetchProducts('computador');
  if (myShop !== Number) {
    return 'Subtotal: R$';
  }
  return myShop;
}
document.querySelector('.total-price').innerText = sumMyCartItems(); */

window.onload = () => {
  getLocal();
  principal();
};
