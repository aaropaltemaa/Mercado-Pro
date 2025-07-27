import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex flex-row justify-between">
        <Link to="/">
          <h1 className="text-lg font-bold">Mercado Pro</h1>
        </Link>
        <Link to="/create-product">Create Product</Link>
      </div>
    </nav>
  );
};

export default NavBar;
