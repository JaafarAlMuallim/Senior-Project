import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-[calc(100vh-3.5rem-1px)]">
      <Loader2 className="w-10 h-10 text-black/80 animate-spin" />
      <p className="text-black/80 text-2xl">Loading...</p>
    </div>
  );
};
export default Loader;
