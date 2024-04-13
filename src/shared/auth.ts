import axios, { AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_API_URL as string;
const token = import.meta.env.VITE_API_KEY as string;

const UseMakeAuthedRequest = () => {
  async function makeAuthedRequest<T = void>(
    request: Partial<AxiosRequestConfig>
  ) {
    const { data } = await axios.request<T>({
      baseURL,
      ...request,
      headers: {
        ...request.headers,
        // Add the Authorization header to the existing headers
        Authorization: token
      }
    });

    return data;
  }

  return makeAuthedRequest;
};

export { UseMakeAuthedRequest };
