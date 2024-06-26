import { AvartarSkeleton } from "../../components/AvartarSkeleton";
import useGetMembers from "./hooks/useGetMembers";

export const Memebers = ({ isMobile = false }: { isMobile?: boolean }) => {
  // Fetch member data
  const { data = [], isLoading } = useGetMembers();

  return (
    <div
      className={`${isMobile ? "flex" : "hidden"} lg:flex justify-center py-4`}
    >
      <div>
        {/* Header */}
        <p className="text-base text-slate-400 font-medium">Members</p>

        {/* Render skeleton loaders while data is loading */}
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div className="mb-2" key={item}>
              <AvartarSkeleton />
            </div>
          ))}

        {/* Render member list */}
        {data.map((item) => (
          <div key={item.id} className="flex items-center mt-4">
            {/* Member avatar */}
            <img
              src={item.profilePictureUrl}
              alt={item.name}
              loading="lazy"
              className="rounded-full w-10 h-10 me-3 border border-rigi-600"
            />

            {/* Member name */}
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
