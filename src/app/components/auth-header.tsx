"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AuthHeader = () => {
  const router = useRouter();
  const logoutHandle = async () => {
    signOut();
  };

  return (
    <header className="flex items-center justify-between p-3 rounded-md my-4 border shadow">
      <Button onClick={() => router.back()} variant="outline">
        <ChevronLeft /> Back
      </Button>
      <Button onClick={logoutHandle}>Logout</Button>
    </header>
  );
};

export default AuthHeader;
