import { useEffect, useState } from "react";
import { getAllCategories } from "../utilities/categoryController.mjs";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const cat = await getAllCategories();
      console.log(cat);
      setCategories(cat);
    }
    fetchCategories();
  }, []);
  //   console.log(categories)
  return <div>Categories</div>;
}
