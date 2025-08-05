import { FaUserCircle } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useAuthStore } from "../store/auth";
import { IoCartOutline } from "react-icons/io5";

const DropDownMenu = () => {
  const user = useAuthStore((state) => state.user);

  console.log(user);

  return (
    <div className="ml-auto flex items-center gap-4">
      <span className="font-medium">{user?.name}</span>
      <Menu>
        <MenuButton className="hover:text-blue-600 transition">
          <FaUserCircle size={30} />
        </MenuButton>
        <MenuItems
          anchor="bottom end"
          className="z-50 bg-white border rounded-md shadow-md p-1"
        >
          <IoCartOutline />
          <MenuItem>
            <a
              className="block px-4 py-2 hover:bg-blue-100 rounded"
              href="/orders"
            >
              My Orders
            </a>
          </MenuItem>
          <MenuItem>
            <a
              className="block px-4 py-2 hover:bg-blue-100 rounded"
              href="/settings"
            >
              Settings
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default DropDownMenu;
