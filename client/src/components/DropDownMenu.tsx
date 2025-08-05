import { FaUserCircle } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const DropDownButton = () => {
  return (
    <Menu>
      <MenuButton>
        <FaUserCircle size={32} />
      </MenuButton>
    </Menu>
  );
};

export default DropDownButton;
