import { AvartarSkeleton } from "../../components/AvartarSkeleton";

export const Memebers = () => {
  return (
    <div className="hidden lg:flex justify-center py-4">
      <div>
        <p className="text-base text-slate-400 font-medium">Members</p>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div className="mb-2" key={item}>
            <AvartarSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};
