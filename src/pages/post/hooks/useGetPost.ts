import { useQuery } from "@tanstack/react-query";
import { UseMakeAuthedRequest } from "../../../shared/auth";
import { PostResnponse } from "../../feed/hooks/types";

const getApiFunction = async (id: string) => {
  const makeRequest = UseMakeAuthedRequest();
  const response = await makeRequest<PostResnponse>({
    method: "get",
    url: `/posts/${id}`
  });
  return response;
};

export default function useGetPost(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => getApiFunction(id)
  });
}
