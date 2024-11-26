import axios from "axios";

async function getInventory() {
  try {
    let url = "http://localhost:3000/api/items";

    let res = await axios.get(url);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function createItem(formData) {
  try {
    let url = "http://localhost:3000/api/items";

    let res = await axios.post(url, formData);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function deleteItem(id) {
  try {
    let url = `http://localhost:3000/api/items/${id}`;

    let res = await axios.delete(url);

    return true;
  } catch (error) {
    console.error(error);
  }
}

async function updateItem(id, formData) {
  try {
    let url = `http://localhost:3000/api/items/${id}`;

    let res = await axios.put(url, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}



async function toggleShoppingListStatus(id) {
  try {
    let url = `http://localhost:3000/api/items/${id}/toggle-shopping`;

    let res = await axios.put(url);

    return res.data;
  } catch (error) {
    console.error("Error toggling shopping list", error);
  }
}

async function findOneItem(id) {
  try {
    let url = `http://localhost:3000/api/items/${id}`;

    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

async function findItemsByCategory(category) {
  try {
    let url = `http://localhost:3000/api/items/category/${category}`;

    let res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  getInventory,
  createItem,
  deleteItem,
  updateItem,
  toggleShoppingListStatus,
  findOneItem,
  findItemsByCategory,
};
