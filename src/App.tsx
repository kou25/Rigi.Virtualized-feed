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
import { FeedProvider } from "./context/FeedProvider";
import { MobileMemebers } from "./pages/members/MobileMemebers";

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
      <Route element={<FeedProvider />}>
        <Route path="/" element={<Navigate replace to="/feed" />} />
        <Route path="/feed" element={<Layout />}>
          <Route element={<Feed />} index />
          <Route path=":id" element={<Post />} />
        </Route>
        <Route path="/members" element={<Layout />}>
          <Route element={<MobileMemebers />} index />
        </Route>
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
