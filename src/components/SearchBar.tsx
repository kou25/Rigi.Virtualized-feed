export const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder=""
        className="w-60 h-8 rounded-lg p-4 pl-8 border-[3px] border-rigi-500 dark:bg-gray-500 dark:border-rigi-400"
      />
      <img
        src={"/search_icon.png"}
        alt="Search Icon"
        className="absolute top-1/2 transform -translate-y-1/2 left-2 w-5 h-5 object-contain"
      />
    </div>
  );
};
