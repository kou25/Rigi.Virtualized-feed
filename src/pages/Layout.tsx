import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { Outlet, useParams } from "react-router-dom";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { SearchBar } from "../components/SearchBar";

const Layout = () => {
  const { id } = useParams();
  const [expand, setExpand] = useState(false);

  return (
    <div className="relative bg-rigi-50 dark:bg-rigi-400 dark:text-white ">
      {/* Navigation bar */}
      <nav className="flex items-center justify-between bg-rigi-100 dark:bg-rigi-300 px-4 py-2 lg:px-8 min-h-20 h-auto">
        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button
            className="text-mcs-800 focus:outline-none"
            onClick={() => setExpand(!expand)}
          >
            {expand ? (
              <IoIosClose className="text-2xl text-red-400" />
            ) : (
              <FaBars className="text-mcs-800" />
            )}
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
        <div className="absolute top-0 left-0 w-full h-full bg-stone-200 lg:hidden">
          <div className="p-8">
            <p className="mb-4 text-base font-medium">Menu</p>
            {/* Add your menu items here */}
          </div>
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

export default Layout;
