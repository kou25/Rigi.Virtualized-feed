import { Link, useParams } from "react-router-dom";
import useGetPost from "./hooks/useGetPost";
import { PostDetailItem } from "./PostDetailItem";
import { FaArrowLeft } from "react-icons/fa";
import { PostSkeleton } from "../../components/PostSkeleton";
import { useEffect } from "react";

const Post = () => {
  // Get post ID from route parameters
  const { id } = useParams();

  // Fetch post data
  const { data, isLoading } = useGetPost(id as string);

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center  min-h-screen h-full">
      {isLoading ? (
        // Render skeleton loader while data is loading
        <div className="w-full lg:w-[40vw]">
          <PostSkeleton />
        </div>
      ) : data ? (
        // Render post detail if data is available
        <div className="border-x-2 border-rigi-500 dark:border-rigi-300 p-4 w-full lg:w-[40vw]">
          {/* Link to navigate back to previous page */}
          <Link to=".." state={id} className="mb-4 cursor-pointer">
            <FaArrowLeft className="text-lg text-gray-600 dark:text-rigi-600" />
          </Link>
          {/* Render post detail */}
          <PostDetailItem post={data} />
        </div>
      ) : (
        // Render message if no data is found
        <>
          <p>No Data Found!</p>
        </>
      )}
    </div>
  );
};

export default Post;
