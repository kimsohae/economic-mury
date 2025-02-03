"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type User = {
  progress: number; // 진행도 0~1
  score: number; // 점수
};

type UserContextType = {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | null>(null);
export const initialUser: User = {
  progress: 0,
  score: 0,
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
  // const
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser는 UserProvider와 함께 사용해 주세요");
  }
  return context;
}
