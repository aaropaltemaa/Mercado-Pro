import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const NavBar: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <nav className="h-20 w-full bg-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-between h-full px-8">
        <Link to="/" className="hover:opacity-80 transition">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Mercado Pro
          </h1>
        </Link>
        <div className="flex flex-row gap-4">
          <Link
            to="/create-product"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
          >
            Create Product
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow transition"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
