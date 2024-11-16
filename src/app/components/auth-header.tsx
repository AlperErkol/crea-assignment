"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const AuthHeader = () => {
  const logoutHandle = async () => {
    signOut();
  };

  return (
    <header className="flex items-center justify-between p-3 rounded-md my-4 bg-slate-500">
      <p className="text-sm">Welcome, user.</p>
      <Button onClick={logoutHandle}>Logout</Button>
    </header>
  );
};

export default AuthHeader;
