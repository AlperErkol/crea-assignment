import React from "react";

interface IProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<IProps> = ({ children }) => {
  return <main className="max-w-6xl mx-auto">{children}</main>;
};

export default Wrapper;
