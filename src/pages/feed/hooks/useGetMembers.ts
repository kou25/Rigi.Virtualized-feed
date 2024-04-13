import { useQuery } from "@tanstack/react-query";
import { UseMakeAuthedRequest } from "../../../shared/auth";
import { membersResponse } from "./types";

const getApiFunction = async () => {
  const makeRequest = UseMakeAuthedRequest();
  const response = await makeRequest<membersResponse[]>({
    method: "get",
    url: "/users"
  });
  return response;
};

export default function useGetMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => getApiFunction(),
    refetchOnWindowFocus: false
  });
}
