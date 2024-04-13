import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Layout from "./pages/Layout";
import Feed from "./pages/feed/Feed";
import Post from "./pages/post/Post";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //globally default to 20 secs
      staleTime: 1000 * 20
    }
  }
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate replace to="/feed" />} />
      <Route path="/feed" element={<Layout />}>
        <Route element={<Feed />} index />
        <Route path=":id" element={<Post />} />
      </Route>
    </>
  )
);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
