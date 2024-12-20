import { Loader2Icon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div
      data-testid="loading"
      className="w-full flex items-center justify-center"
    >
      <Loader2Icon className="animate-spin" />
    </div>
  );
};

export default Loading;
