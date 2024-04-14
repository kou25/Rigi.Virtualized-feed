import moment from "moment";
import { PostResnponse } from "../feed/hooks/types";

export const PostDetailItem = ({ post }: { post: PostResnponse }) => {
  return (
    <div className="flex items-start mt-4  ">
      <img
        src={post?.author?.profilePictureUrl}
        alt={post?.author?.name}
        loading="lazy"
        className="rounded-full w-8 h-8 me-5 border border-rigi-600"
      />
      <div className="flex-1">
        <div className="my-1">
          <p className="text-sm font-medium text-gray-900 dark:text-rigi-600 ">
            {post.author.name}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-xs font-light text-gray-500 dark:text-rigi-700">
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-base">{post.text}</p>
        </div>
        <div className="flex flex-col items-center justify-between w-full h-full rounded-xl">
          {post.attachments.length > 0 ? (
            <>
              {post.attachments.map((item) =>
                item.type === "image" ? (
                  <img
                    key={item.id}
                    src={item.url}
                    alt={item.type}
                    loading="lazy"
                    className="w-full h-80  border border-rigi-600 object-cover mb-4"
                  />
                ) : (
                  <video
                    key={item.id}
                    className="w-full h-80  border border-rigi-600 object-cover mb-4"
                    controls
                    playsInline
                    autoPlay
                    muted
                    preload="metadata"
                    poster="/video-icon.png"
                  >
                    <source src={item.url} type="video/mp4" />
                  </video>
                )
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <img
                src={"/warning.png"}
                alt={"warning"}
                loading="lazy"
                className={` h-20 w-20  object-cover mb-4`}
              />
              <p className="text-xs font-medium text-gray-600 dark:text-rigi-600">
                Sorry No Attachment Found!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
