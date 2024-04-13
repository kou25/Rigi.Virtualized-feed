import { FeedItems } from "./FeedItems";
import { Memebers } from "./Memebers";

const Feed = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-screen">
      <div className="hidden lg:block"></div>
      <FeedItems />
      <Memebers />
    </div>
  );
};

export default Feed;
