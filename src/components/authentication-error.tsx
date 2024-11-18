import type React from "react";
import { TriangleAlert } from "lucide-react";

interface IProps {
  message: string;
}

const AuthenticationError: React.FC<IProps> = ({ message }) => {
  return (
    <div className="bg-destructive/15 p-3 rounded-md text-sm text-destructive flex items-center gap-2">
      <TriangleAlert size={20} />
      {message}
    </div>
  );
};

export default AuthenticationError;
