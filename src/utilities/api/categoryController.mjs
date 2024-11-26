import axios from "axios";

async function getAllCategories() {
  try {
    let url = "http://localhost:3000/api/categories";

    let res = await axios.get(url);

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function createCategory(formData) {
  try {
    let url = "http://localhost:3000/api/categories";

    let res = await axios.post(url, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// Check if a category exists in the database
async function checkCategoryExists(name) {
  try {
    const url = `http://localhost:3000/api/categories/exists/${name}`;
    const response = await axios.get(url);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking category existence:", error);
    return false; // Default to "not exists" on error
  }
}

async function deleteCategory(id) {
  try {
    let url = `http://localhost:3000/api/categories/${id}`;

    let res = await axios.delete(url);

    return true;
  } catch (error) {
    console.error(error);
  }
}

async function deleteCategoryAndUpdate(categoryId) {
  try {
    let url = `http://localhost:3000/api/categories/category/${categoryId}/`;

    let res = await axios.delete(url);

    return true;
  } catch (error) {
    console.error(error);
  }
}

async function updateCategory(id, formData) {
  try {
    let url = `http://localhost:3000/api/categories/${id}`;

    let res = await axios.put(url, formData);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

// async function updateItemCategories(categoryName) {
//   try {
//     let url = `http://localhost:3000/api/categories/category/${categoryName}`;

//     let res = await axios.put(url, formData);

//     return res.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

async function getOneCategory(id) {
  try {
    let url = `http://localhost:3000/api/categories/${id}`;

    let res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export {
  getAllCategories,
  createCategory,
  checkCategoryExists,
  getOneCategory,
  deleteCategory,
  deleteCategoryAndUpdate,
  updateCategory,
  // updateItemCategories,
};
