import AuthHeader from "@/components/auth-header";
import Wrapper from "@/components/wrapper";
import type React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <AuthHeader />
      <main>{children}</main>
    </Wrapper>
  );
};

export default layout;
