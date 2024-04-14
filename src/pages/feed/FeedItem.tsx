import moment from "moment";
import { PostResnponse } from "./hooks/types";

export const FeedItem = ({ post }: { post: PostResnponse }) => {
  const renderAttachments = () => {
    if (post.attachments.length === 0) return null;

    const videos = post.attachments.filter((item) => item.type === "video");
    const images = post.attachments.filter((item) => item.type === "image");

    if (videos.length + images.length > 2) {
      return (
        <div className="grid grid-cols-2 gap-2 w-full">
          <div>
            {videos.map((item) => (
              <div key={item.id} className="block">
                <video
                  key={item.id}
                  className={`w-full ${
                    videos.length > 1 ? "h-28" : "h-56"
                  } me-1 border border-rigi-600 object-cover`}
                  controls
                  playsInline
                  autoPlay
                  muted
                  preload="metadata"
                  poster="/video-icon.png"
                >
                  <source src={item.url} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
          <div>
            {images.map((item, i) => (
              <div key={item.id} className="">
                <img
                  key={item.id}
                  src={item.url}
                  alt={item.type}
                  loading="lazy"
                  className={`w-full ${
                    images.length > 1 ? "h-28" : "h-56"
                  } me-1 border border-rigi-600 object-cover ${
                    i === 0 ? "mb-1" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return post.attachments.map((item) =>
        item.type === "image" ? (
          <img
            key={item.id}
            src={item.url}
            alt={item.type}
            loading="lazy"
            className="w-full h-56 me-5 border border-rigi-600 object-cover"
          />
        ) : (
          <video
            key={item.id}
            className="w-full h-56 me-5 border border-rigi-600 object-cover"
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
      );
    }
  };

  return (
    <div key={post.id} className="flex items-start mt-4">
      <img
        src={post.author.profilePictureUrl}
        alt={post.author.name}
        loading="lazy"
        className="rounded-full w-8 h-8 me-5 border border-rigi-600"
      />
      <div className="flex-1">
        <div className="my-1">
          <p className="text-sm font-medium text-gray-900 dark:text-rigi-600">
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
        <div className="flex items-center justify-start w-full h-56 rounded-xl">
          {renderAttachments()}
        </div>
      </div>
    </div>
  );
};
