export const PostSkeleton = () => {
  return (
    <div role="status" className="animate-pulse dark:border-gray-500 px-2">
      <div className="flex items-start mt-4">
        <svg
          className="w-10 h-10 me-3 text-rigi-600 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="flex-1">
          <div className="h-4 bg-rigi-600 rounded-md dark:bg-gray-500 w-24 mb-2"></div>
          <div className="h-4 bg-rigi-700 rounded-md dark:bg-gray-500 w-[90%] mb-2"></div>
          <div className="h-4 bg-rigi-700 rounded-md dark:bg-gray-500 w-full mb-4"></div>
          <div className="flex items-center justify-center w-full h-32 bg-rigi-600 rounded-xl  dark:bg-gray-700">
            <svg
              className="w-8 h-8 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
