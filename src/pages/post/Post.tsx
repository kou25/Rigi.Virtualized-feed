import { Link, useParams } from "react-router-dom";
import useGetPost from "./hooks/useGetPost";
import { PostDetailItem } from "./PostDetailItem";
import { FaArrowLeft } from "react-icons/fa";
import { PostSkeleton } from "../../components/PostSkeleton";

const Post = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetPost(id as string);

  return (
    <div className="flex justify-center  h-screen">
      {isLoading ? (
        <div className="w-full lg:w-[40vw]">
          <PostSkeleton />
        </div>
      ) : data ? (
        <div className="border-x-2 border-[#DAE4ED] dark:border-rigi-300 p-4 w-full lg:w-[40vw]">
          <Link to=".." className="mb-4 cursor-pointer">
            <FaArrowLeft className="text-lg text-gray-600 dark:text-rigi-600" />
          </Link>
          <PostDetailItem post={data} />
        </div>
      ) : (
        <>
          <p>No Data Found!</p>
        </>
      )}
    </div>
  );
};

export default Post;
