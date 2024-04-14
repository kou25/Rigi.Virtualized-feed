/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PostResnponse } from "../pages/feed/hooks/types";
import useGetFeeds from "../pages/feed/hooks/useGetFeeds";
import { Outlet } from "react-router-dom";

// Define the shape of the context data
interface FeedContextShape {
  posts: PostResnponse[];
  isLoading: boolean;
  fetchNextPage: () => void;
  total: number;
  hasMore: boolean;
  updateSearch: (value: string) => void;
  status: string;
  error: Error | null;
  isFetchingNextPage: boolean;
  search: string;
}

// Initial state of the context
const initialState: FeedContextShape = {
  posts: [] as PostResnponse[],
  isLoading: true,
  fetchNextPage: () => {},
  total: 0,
  hasMore: false,
  updateSearch: () => {},
  status: "pending",
  error: null,
  isFetchingNextPage: false,
  search: ""
};

// Create the context
const FeedContext = createContext<FeedContextShape>(
  initialState as FeedContextShape
);

// Provider component for the feed context
function FeedProvider() {
  // State for search query
  const [search, setSearch] = useState("");

  // Fetch feed data hook
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch
  } = useGetFeeds(search);

  // Memoized computed value for all rows
  const allRows = useMemo(() => {
    return data && search.length === 0
      ? (data.pages.flatMap((d) => d.data) as PostResnponse[])
      : data && search.length !== 0
      ? (data.pages.flatMap((d) => d) as any[])
      : [];
  }, [data, search]);

  // Function to update search query
  const updateSearch = (value: string) => {
    setSearch(value);
  };

  // Refetch data when search query changes
  useEffect(() => {
    if (search.length > 0) {
      refetch();
    }
  }, [search]);

  // Memoized context value
  const value = useMemo(
    () => ({
      posts: allRows,
      isLoading: isFetching,
      fetchNextPage,
      total: 0,
      hasMore: hasNextPage,
      updateSearch,
      status,
      error,
      isFetchingNextPage,
      search
    }),
    [
      updateSearch,
      isFetching,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
      allRows,
      status,
      error,
      search
    ]
  );

  // Provide the context value to descendants
  return (
    <FeedContext.Provider value={value}>
      <Outlet />
    </FeedContext.Provider>
  );
}

// Export the provider and custom hook
export { FeedProvider };

export default function useFeed() {
  // Custom hook to consume the feed context
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error(`useFeed must be used within a FeedProvider`);
  }

  return context;
}
