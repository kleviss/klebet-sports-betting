/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Implement actual login logic
    setUser({ id: "1", email, balance: 1000 });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    // TODO: Implement actual registration logic
    setUser({ id: "1", email, balance: 1000 });
  };

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
