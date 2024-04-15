import { fireEvent, render, screen } from "@testing-library/react";
import { SearchBar } from "../components/SearchBar";

describe("SearchBar", () => {
  it("renders the search input field", () => {
    render(<SearchBar />);
    const searchInput = screen.getByLabelText("Search");
    expect(searchInput).toBeInTheDocument();
  });

  it("updates the search input value", () => {
    render(<SearchBar />);
    const searchInput = screen.getByLabelText("Search") as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput.value).toBe("test");
  });
});
