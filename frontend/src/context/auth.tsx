// AuthContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import { login, USER_LOCAL_STORAGE_ACCESS_KEY } from "../api/user";
import { useNavigate } from "react-router";

interface AuthContextType {
  isAuth: boolean;
  user: User | null;
  doLogin: (user: Omit<User, "email">) => void;
  doLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuth, setIsAuth] = useState(() => {
    // Try to read from local storage on first render
    const storedUser = localStorage.getItem(USER_LOCAL_STORAGE_ACCESS_KEY);
    return !!storedUser; // true if exists, false otherwise
  });

  const [user, setUser] = useState<User | null>(() => {
    // Try to read from local storage on first render
    const localStorageRaw = localStorage.getItem(USER_LOCAL_STORAGE_ACCESS_KEY);
    if (localStorageRaw) {
      return JSON.parse(localStorageRaw) as User;
    }

    return null;
  });

  const navigate = useNavigate();

  const doLogin = (loginData: Omit<User, "email">) => {
    login(loginData).then((user) => {
      setIsAuth(true);
      setUser(user);
      localStorage.setItem(USER_LOCAL_STORAGE_ACCESS_KEY, JSON.stringify(user));
      navigate("/vehicles");
    });
  };

  const doLogout = () => {
    setIsAuth(false);
    localStorage.removeItem(USER_LOCAL_STORAGE_ACCESS_KEY);
    navigate("/");
  };

  return <AuthContext.Provider value={{ isAuth, doLogin, doLogout, user }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const c = useContext(AuthContext);
  if (!c) throw new Error("useAuth must be inside <AuthProvider>");
  return c;
}
