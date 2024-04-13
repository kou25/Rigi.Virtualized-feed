import { PostSkeleton } from "../../components/PostSkeleton";

export const FeedItems = () => {
  return (
    <div className="col-span-1 lg:col-span-2  border-x-2 border-[#DAE4ED] dark:border-rigi-300 p-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div className="mb-8" key={item}>
          <PostSkeleton />
        </div>
      ))}
    </div>
  );
};
