import { useEffect, useRef } from "react";
import { PostSkeleton } from "../../components/PostSkeleton";
import { PostResnponse } from "./hooks/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { FeedItem } from "./FeedItem";
import { useLocation, useNavigate } from "react-router-dom";

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
  // Ref for the parent element
  const parentRef = useRef<HTMLDivElement>(null);

  // Access to navigation function
  const navigate = useNavigate();

  // Row virtualizer
  const rowVirtualizer = useVirtualizer({
    count: hasMore ? posts.length + 1 : posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 350,
    overscan: 20
  });

  // Scroll Position Reset on Refresh
  useEffect(() => {
    // Reset scroll position to the top when the component mounts
    window.scrollTo(0, 0);

    // Event listener for beforeunload event to reset scroll position and location state
    const handleBeforeUnload = () => {
      navigate("..", { state: null });
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Fetch more posts when reaching the end of the list
  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (
      lastItem &&
      lastItem.index >= posts.length - 1 &&
      hasMore &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasMore,
    posts.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems()
  ]);

  // Smooth scroll if item is visible in DOM tree
  const location = useLocation();
  useEffect(() => {
    if (location.state && !isFetchingNextPage) {
      const scrollId = location.state;
      const parent = parentRef.current;
      if (parent) {
        setTimeout(() => {
          const element = parent.querySelector(`[id="item-${scrollId}"]`);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 0);
      }
    }
  }, [location.state, isFetchingNextPage]);

  return (
    <div
      className="col-span-1 lg:col-span-2  border-x-2 border-[#DAE4ED] dark:border-rigi-300 p-4"
      id="feeds"
    >
      {/* Render loaders or posts based on status */}
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
            id="rowVirtualizer"
          >
            {/* Render virtualized list */}
            {posts.length > 0 ? (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const isLoaderRow = virtualRow.index > posts.length - 1;
                const post = posts[virtualRow.index];

                return (
                  post && (
                    <div
                      key={virtualRow.index}
                      id={`item-${post?.id}`}
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
                  )
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

// Loaders component
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
