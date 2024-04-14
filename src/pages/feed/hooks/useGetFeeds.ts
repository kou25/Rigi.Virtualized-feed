import { useInfiniteQuery } from "@tanstack/react-query";
import { UseMakeAuthedRequest } from "../../../shared/auth";
import { PostsResponseWithPagination } from "./types";

const getApiFunction = async (pageParam: number, search?: string) => {
  const makeRequest = UseMakeAuthedRequest();
  const searchQuery =
    search && search.trim().length > 0 ? `&query=${search}` : "";
  const url = `/posts?limit=10&page=${pageParam}${searchQuery}`;
  const response = await makeRequest<PostsResponseWithPagination>({
    method: "get",
    url
  });
  return response;
};

export default function useGetFeeds(search?: string) {
  return useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam = 1 }) => getApiFunction(pageParam, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.pagination.hasMore
        ? pages.length + 1
        : undefined;
      return nextPage;
    }
  });
}
