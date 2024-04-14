import { useEffect, useRef } from "react";
import { PostSkeleton } from "../../components/PostSkeleton";
import { PostResnponse } from "./hooks/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FeedItem } from "./FeedItem";

export const FeedItems = ({
  posts,
  hasMore,
  status,
  error,
  isFetchingNextPage,
  fetchNextPage
}: {
  posts: PostResnponse[];
  hasMore: boolean;
  status: string;
  error: Error | null;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: hasMore ? posts.length + 1 : posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 5
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= posts.length - 1 && hasMore && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    hasMore,
    posts.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems()
  ]);

  return (
    <div className="col-span-1 lg:col-span-2  border-x-2 border-[#DAE4ED] dark:border-rigi-300 p-4">
      {status === "pending" ? (
        <Loaders />
      ) : status === "error" ? (
        <span>Error: {(error as Error).message}</span>
      ) : (
        <div
          ref={parentRef}
          className="List"
          style={{
            height: `100vh`,
            width: `100%`,
            overflow: "auto"
          }}
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative"
            }}
          >
            {posts.length > 0 ? (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > posts.length - 1;
                const post = posts[virtualRow.index];

                return (
                  <div
                    key={virtualRow.index}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      maxHeight: `${virtualRow.size}px`,
                      height: "auto",
                      transform: `translateY(${virtualRow.start}px)`
                    }}
                  >
                    {isLoaderRow ? (
                      hasMore ? (
                        <p className="text-center my-4 text-gray-500 dark:text-rigi-700">
                          Loading more...
                        </p>
                      ) : (
                        "Nothing more to load"
                      )
                    ) : (
                      <FeedItem post={post} />
                    )}
                  </div>
                );
              })
            ) : (
              <>
                <p>No Posts Found !</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Loaders = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div className="mb-8" key={item}>
          <PostSkeleton />
        </div>
      ))}
    </>
  );
};
