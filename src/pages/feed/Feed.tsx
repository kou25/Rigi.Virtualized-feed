import useFeed from "../../context/FeedProvider";
import { FeedItems } from "./FeedItems";
import { Memebers } from "./Memebers";

const Feed = () => {
  const { posts, hasMore, status, error, isFetchingNextPage, fetchNextPage } =
    useFeed();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-screen">
      <div className="hidden lg:block"></div>

      <FeedItems
        posts={posts}
        hasMore={hasMore}
        status={status}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
      <Memebers />
    </div>
  );
};

export default Feed;
