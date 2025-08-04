import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../store/cart";
import SearchBar from "./SearchBar";

const NavBar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const cartCount = useCart((state) =>
    state.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="h-20 w-full bg-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-between h-full px-8">
        <Link to="/" className="hover:opacity-80 transition">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Mercado Pro
          </h1>
        </Link>
        <SearchBar />
        <div className="flex items-center gap-6">
          <Link
            to="/cart"
            className=" text-white p-2 rounded-lg hover:opacity-60 transition shadow flex items-center justify-center"
          >
            <div className="relative">
              <CiShoppingCart size={44} />
              {cartCount > 0 && user && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <div className="flex gap-6">
            <Link
              to="/create-product"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
            >
              Create Product
            </Link>
            {user ? (
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
