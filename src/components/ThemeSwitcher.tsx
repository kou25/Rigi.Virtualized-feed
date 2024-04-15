import { useEffect, useState } from "react";
import { IoIosSunny, IoIosMoon } from "react-icons/io";

export const ThemeSwitcher = () => {
  // Check if dark mode is already enabled based on localStorage
  const isAlreadyDarkModeEnabled =
    localStorage.getItem("darkMode") === "true" ? true : false;

  // State to track dark mode
  const [darkMode, setDarkMode] = useState<boolean>(isAlreadyDarkModeEnabled);

  // Effect to toggle dark mode and update localStorage
  useEffect(() => {
    // Toggle the 'dark' class on the root element based on darkMode state
    document.documentElement.classList.toggle("dark", darkMode);
    // Save the darkMode state to localStorage
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode); // Invert the current darkMode state
  };

  // Function to handle keyboard events for accessibility
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Toggle dark mode when Enter key is pressed
    if (event.key === "Enter") {
      toggleDarkMode();
    }
  };

  return (
    // Container for the theme switcher icon
    <div
      data-testid="theme-switcher"
      onClick={toggleDarkMode}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="cursor-pointer"
      aria-label={darkMode ? "Enable light mode" : "Enable dark mode"}
    >
      {/* Render sun icon if darkMode is false, otherwise render moon icon */}
      {darkMode ? (
        <IoIosMoon className="text-2xl text-white" />
      ) : (
        <IoIosSunny className="text-2xl text-blue-400" />
      )}
    </div>
  );
};
