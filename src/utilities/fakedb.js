// use local storage as your db for now
const addToDb = (key) => {
  const exists = getDb();
  let shopping_cart = {};
  if (!exists) {
    shopping_cart[key] = 1;
  }
  else {
    shopping_cart = JSON.parse(exists);
    if (shopping_cart[key]) {
      const newCount = shopping_cart[key] + 1;
      shopping_cart[key] = newCount;
    }
    else {
      shopping_cart[key] = 1;
    }
  }
  updateDb(shopping_cart);
}

const getDb = () => localStorage.getItem('shopping_cart');

const updateDb = cart => {
  localStorage.setItem('shopping_cart', JSON.stringify(cart));
}

const removeFromDb = key => {
  const exists = getDb();
  if (!exists) {

  }
  else {
    const shopping_cart = JSON.parse(exists);
    delete shopping_cart[key];
    updateDb(shopping_cart);
  }
}

const getStoredCart = () => {
  const exists = getDb();
  return exists ? JSON.parse(exists) : {};
}

const clearTheCart = () => {
  localStorage.removeItem('shopping_cart');
}

export { addToDb, removeFromDb, clearTheCart, getStoredCart }