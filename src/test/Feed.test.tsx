import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import Post from "../pages/post/Post";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Post component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("renders skeleton loader while data is loading", () => {
    render(<App />);

    expect(screen.getAllByTestId("skeleton-loader")).toBeTruthy();
  });

  it("Feed items should be available", () => {
    render(<App />);

    expect(screen.getByTestId("feeds")).toBeTruthy();
  });

  it("should navigate to post details page", () => {
    const queryClient = new QueryClient();
    const id = "1"; // replace with an actual id from your data
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[`/feed/${id}`]}>
          <Post />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByTestId(`post-detail`)).toBeTruthy();
  });
});
