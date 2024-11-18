import AuthHeader from "@/components/auth-header";
import Wrapper from "@/components/wrapper";
import type React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AuthHeader />
      <div>{children}</div>
    </Wrapper>
  );
};

export default layout;
