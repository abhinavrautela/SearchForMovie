import { memo } from "react";

const CastCard = ({
  avatarLink,
  name,
}: {
  avatarLink: string;
  name?: string;
}) => {
  return (
    <div className="p-1 m-1 flex flex-col items-center">
      <img className="w-28 h-28 rounded-full border border-slate-700" src={avatarLink} alt="" />
      <p className="font-semibold text-blue-600">{name}</p>
    </div>
  );
};

export default memo(CastCard);