import { AvartarSkeleton } from "../../components/AvartarSkeleton";

const Feed = () => {
  return (
    <div className="grid grid-cols-4 gap-6 min-h-screen">
      <div></div>
      <div className="col-span-2  border-x-2 border-[#DAE4ED] p-4">Posts</div>
      <div className="flex justify-center py-4">
        <div>
          <p className="text-base text-slate-400 font-medium">Members</p>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div className="mb-2" key={item}>
              <AvartarSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
