import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoIosClose, IoIosSunny } from "react-icons/io";
import { Outlet, useParams } from "react-router-dom";

const Layout = () => {
  const { id } = useParams();
  const [expand, setExpand] = useState(false);
  return (
    <div className="relative">
      <nav className="flex items-center justify-between bg-stone-200 px-4 py-2 lg:px-8 min-h-20 h-auto">
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
        <div className="flex-1">
          <div className="flex justify-center w-full">
            {!id && <input type="text" placeholder="search" />}
          </div>
        </div>
        <div>
          <IoIosSunny className="text-2xl text-blue-400" />
        </div>
      </nav>
      {expand && (
        <div className="absolute top-0 left-0 w-full h-full bg-stone-200 lg:hidden">
          <div className="p-8">
            <p className="mb-4 text-base font-medium">Menu</p>
            {/* Add your menu items here */}
          </div>
        </div>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
