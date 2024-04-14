/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";
import { PostResnponse } from "../pages/feed/hooks/types";
import useGetFeeds from "../pages/feed/hooks/useGetFeeds";
import { Outlet } from "react-router-dom";

interface FeedContextShape {
  posts: PostResnponse[];
  isLoading: boolean;
  fetchNextPage: () => void;
  total: number;
  hasMore: boolean;
  handleSearch: (value: string) => void;
  status: string;
  error: Error | null;
  isFetchingNextPage: boolean;
}

const initialState: FeedContextShape = {
  posts: [] as PostResnponse[],
  isLoading: true,
  fetchNextPage: () => {},
  total: 0,
  hasMore: false,
  handleSearch: () => {},
  status: "pending",
  error: null,
  isFetchingNextPage: false
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
    hasNextPage
  } = useGetFeeds(search);

  const allRows = useMemo(() => {
    return data ? (data.pages.flatMap((d) => d.data) as PostResnponse[]) : [];
  }, [data]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const value = useMemo(
    () => ({
      posts: allRows,
      isLoading: isFetching,
      fetchNextPage,
      total: 0,
      hasMore: hasNextPage,
      handleSearch,
      status,
      error,
      isFetchingNextPage
    }),
    [
      isFetching,
      isFetchingNextPage,
      fetchNextPage,
      hasNextPage,
      allRows,
      handleSearch,
      status,
      error
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
