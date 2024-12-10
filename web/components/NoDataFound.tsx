import { Frown } from "lucide-react";
import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-3.5rem-1px)]">
      <Frown size={56} />
      <p className="text-black/80 text-2xl">No Data Found</p>
    </div>
  );
};
export default NoDataFound;
