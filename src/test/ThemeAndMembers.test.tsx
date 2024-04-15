import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

describe("Theme & Members flow test", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  //Members
  it("Members title is visible", () => {
    render(<App />);
    expect(screen.getByText(/Members/i)).toBeVisible();
  });

  // Theme Switcher
  it("renders the theme switcher icon", () => {
    render(<ThemeSwitcher />);
    const themeSwitcherIcon = screen.getByTestId("theme-switcher");
    expect(themeSwitcherIcon).toBeVisible();
  });

  it("toggles dark mode when clicked", () => {
    render(<ThemeSwitcher />);
    const themeSwitcherIcon = screen.getByTestId("theme-switcher");

    // Dark mode should be disabled initially
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click the theme switcher icon
    fireEvent.click(themeSwitcherIcon);

    // Dark mode should be enabled after clicking
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Click the theme switcher icon again
    fireEvent.click(themeSwitcherIcon);

    // Dark mode should be disabled again
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggles dark mode when Enter key is pressed", () => {
    render(<ThemeSwitcher />);
    const themeSwitcherIcon = screen.getByTestId("theme-switcher");

    // Dark mode should be disabled initially
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Press Enter key on the theme switcher icon
    fireEvent.keyDown(themeSwitcherIcon, { key: "Enter" });

    // Dark mode should be enabled after pressing Enter key
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Press Enter key on the theme switcher icon again
    fireEvent.keyDown(themeSwitcherIcon, { key: "Enter" });

    // Dark mode should be disabled again
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
