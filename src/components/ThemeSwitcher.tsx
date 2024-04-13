import { useEffect, useState } from "react";
import { IoIosSunny, IoIosMoon } from "react-icons/io";

export const ThemeSwitcher = () => {
  const isAlreadyDarkModeEnabled =
    localStorage.getItem("darkMode") === "true" ? true : false;
  const [darkMode, setDarkMode] = useState<boolean>(isAlreadyDarkModeEnabled);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div onClick={toggleDarkMode} className="cursor-pointer">
      {darkMode ? (
        <IoIosMoon className="text-2xl text-white" />
      ) : (
        <IoIosSunny className="text-2xl text-blue-400" />
      )}
    </div>
  );
};
