import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { FaUserCircle, FaSignOutAlt, FaHistory } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";

const DropDownMenu = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="ml-auto flex items-center gap-4 relative">
      <Menu>
        <MenuButton className="flex items-center gap-3 hover:text-blue-600 transition">
          <span>{user?.name}</span>
          <FaUserCircle size={30} />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="z-50 bg-white border rounded-md shadow-md p-1"
          >
            {user?.role === "BUYER" ? (
              <MenuItem>
                <Link
                  className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-lg"
                  to="/order-history"
                >
                  <FaHistory />
                  My Orders
                </Link>
              </MenuItem>
            ) : (
              <MenuItem>
                <Link
                  className="flex items-center gap-2 px-3 py-2 hover:bg-blue-100 rounded-lg"
                  to="/my-products"
                >
                  <FaHistory />
                  My Products
                </Link>
              </MenuItem>
            )}
            {user && (
              <MenuItem>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-left text-red-600 hover:bg-red-100"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </MenuItem>
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropDownMenu;
