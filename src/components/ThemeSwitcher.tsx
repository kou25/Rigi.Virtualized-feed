import { useEffect, useState } from "react";
import { IoIosSunny, IoIosMoon } from "react-icons/io";

export const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

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
