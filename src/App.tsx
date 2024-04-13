import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Posts from "./pages/posts/Posts";
import PostDetails from "./pages/posts/PostDetails";
import Layout from "./pages/Layout";

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
      <Route path="/" element={<Navigate replace to="/posts" />} />
      <Route path="/posts" element={<Layout />}>
        <Route element={<Posts />} index />
        <Route path=":id" element={<PostDetails />} />
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
