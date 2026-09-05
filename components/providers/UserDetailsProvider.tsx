"use client";

import { UserDetails } from "@/types/user";
import { createContext, useContext, useState } from "react";


type UserDetailsContextType = {
  user: UserDetails | null;
  setUser: (user: UserDetails | null) => void;
};

const UserDetailsContext =
  createContext<UserDetailsContextType | null>(null);

export function UserDetailsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserDetails | null>(null);

  return (
    <UserDetailsContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailsContext.Provider>
  );
}

export function useUserDetails() {
  const context = useContext(UserDetailsContext);

  if (!context) {
    throw new Error(
      "useUserDetails must be used inside UserDetailsProvider"
    );
  }

  return context;
}