"use client";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  session: User | null;
  sessionLoginByEmail: (
    email: string,
    password: string,
    redirectTo: string
  ) => Promise<void>;
  sessionRegisterByEmail: (
    email: string,
    password: string,
    redirectTo: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuth = () => React.useContext(AuthContext);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setSession(JSON.parse(storedUser));
    }
  }, []);

  const sessionLoginByEmail = async (
    email: string,
    password: string,
    redirectTo: string
  ) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const user = await response.json();

      localStorage.setItem("user", JSON.stringify(user));

      setSession(user);
      router.push(redirectTo);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const sessionRegisterByEmail = async (
    email: string,
    password: string,
    redirectTo: string
  ) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const user = await response.json();

      localStorage.setItem("user", JSON.stringify(user));

      setSession(user);
      router.push(redirectTo);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setSession(null);

    fetch("/api/login", {
      method: "GET",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ session, sessionLoginByEmail, sessionRegisterByEmail, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
