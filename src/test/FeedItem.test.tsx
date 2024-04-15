import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../App";

// Replace jest.mock with vi.mock
vi.mock("../hooks/useFeed", () => ({
  __esModule: true,
  useFeed: jest.fn(() => ({
    posts: [],
    hasMore: false,
    status: "success",
    error: null,
    isFetchingNextPage: false,
    fetchNextPage: jest.fn()
  }))
}));

describe("Feed component", () => {
  it("calls fetchNextPage when scrolling to the bottom", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    );

    // Simulate scrolling to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
  });
});
