import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to={"/"}>Home</Link>
      {" | "}
      <Link to={"/inventory"}>Inventory</Link>
      {" | "}
      <Link to={"/categories"}>Manage Categories</Link>
      {" | "}
      <Link to={"/shopping-list"}>Shopping List</Link>
    </nav>
  );
}
