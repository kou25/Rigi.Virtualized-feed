/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PostResnponse } from "../pages/feed/hooks/types";
import useGetFeeds from "../pages/feed/hooks/useGetFeeds";
import { Outlet } from "react-router-dom";

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

const FeedContext = createContext<FeedContextShape>(
  initialState as FeedContextShape
);

function FeedProvider() {
  const [search, setSearch] = useState("");
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

  const allRows = useMemo(() => {
    return data && search.length === 0
      ? (data.pages.flatMap((d) => d.data) as PostResnponse[])
      : data && search.length !== 0
      ? (data.pages.flatMap((d) => d) as any[])
      : [];
  }, [data, search]);

  const updateSearch = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    if (search.length > 0) {
      refetch();
    }
  }, [search]);

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

  return (
    <FeedContext.Provider value={value}>
      <Outlet />
    </FeedContext.Provider>
  );
}

export { FeedProvider };

export default function useFeed() {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error(`useFeed must be used within a FeedProvider`);
  }

  return context;
}
