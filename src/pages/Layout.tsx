import { useState } from "react";
import { FaBars, FaUsers } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { SearchBar } from "../components/SearchBar";
import cn from "classnames";
import { MdOutlineFeed } from "react-icons/md";

type NavItemProps = {
  label: string;
  to: string;
  icon: any;
  onClose?: () => void;
};

const Layout = () => {
  const { id } = useParams();
  const [expand, setExpand] = useState(false);
  const menuItems = useGetMenuItems();

  return (
    <div className="relative bg-rigi-50 dark:bg-rigi-400 dark:text-white">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between bg-rigi-100 dark:bg-rigi-300 px-4 py-2 lg:px-8 min-h-20 h-auto">
        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button
            className="text-mcs-800 focus:outline-none"
            onClick={() => setExpand(!expand)}
            aria-label="Toggle mobile menu"
          >
            <FaBars className="text-mcs-800" />
          </button>
        </div>
        {/* Search bar */}
        <div className="flex-1">
          <div className="flex justify-center w-full">
            {/* Render search bar only when id is not present */}
            {!id && <SearchBar />}
          </div>
        </div>
        {/* Theme switcher */}
        <ThemeSwitcher />
      </nav>
      {/* Mobile menu */}
      {expand && (
        <div className="absolute z-50 top-0 left-0 w-full h-full bg-white dark:bg-rigi-400 lg:hidden">
          <div className="p-8 flex justify-between">
            <p className="mb-4 text-base font-medium">Menu</p>
            <div
              onClick={() => setExpand(!expand)}
              className="cursor-pointer"
              tabIndex={0}
              aria-label="Close mobile menu"
            >
              <IoIosClose className="text-2xl text-red-400" />
            </div>
            {/* Add your menu items here */}
          </div>
          <nav className="flex-1 px-0 space-y-1 overflow-auto bg-white dark:bg-rigi-400">
            {menuItems.map((item) => (
              <NavItem
                key={item.to}
                label={item.label}
                to={item.to}
                icon={item.icon}
                onClose={() => setExpand(false)}
              />
            ))}
          </nav>
        </div>
      )}
      {/* Main content */}
      <main className="flex-1 flex flex-col p-4 container mx-auto min-h-screen">
        {/* Render nested routes */}
        <Outlet />
      </main>
    </div>
  );
};

function NavItem({ label, to, icon, onClose }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          isActive
            ? "bg-gray-100 dark:bg-rigi-300 text-mcs-900 border-l-4 border-mcs-900"
            : "text-gray-400 hover:bg-gray-50 hover:text-gray-900",
          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
        )
      }
      onClick={onClose}
      aria-current="page"
    >
      <span className="flex justify-center items-center" aria-hidden="true">
        {icon}
      </span>
      <span className="inline-block ml-2">{label}</span>
    </NavLink>
  );
}

function useGetMenuItems() {
  const navItems: NavItemProps[] = [
    {
      label: "Feed",
      to: "/",
      icon: <MdOutlineFeed className="w-6" aria-label="Feed" />
    },

    {
      label: "Members",
      to: "/members",
      icon: <FaUsers className="w-6" aria-label="Members" />
    }
  ];

  return navItems;
}

export default Layout;
