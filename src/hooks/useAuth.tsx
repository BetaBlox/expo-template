import { User } from "@/models/User";
import { createContext, useContext, useState } from "react";
import Api from "@/services/Api";
import {
  STORAGE_KEY_AUTH_SESSION,
  STORAGE_KEY_AUTH_TOKEN,
  getUserSession,
} from "@/services/Auth";
import Storage from "@/services/Storage";

interface AuthContextI {
  user: User | undefined;
  updateUser: (data: object) => Promise<void>;
  loadUserFromSession: () => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
  isLoaded: boolean;
}

export const AuthContext = createContext<AuthContextI>({
  user: undefined,
  updateUser: () => Promise.resolve(),
  loadUserFromSession: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  isLoading: true,
  isLoaded: false,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children?: React.ReactNode;
}
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User>();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadUserFromSession() {
    console.log("loading user...");
    const session = await getUserSession();
    let user = undefined;

    if (session) {
      console.log("found session:", session);
      user = await Api.user.me();
      console.log("found user:", user);
    } else {
      console.log("no session found");
    }

    setUser(user);
    setIsLoading(false);
    setIsLoaded(true);
  }

  async function updateUser(updates: object) {
    const newUser = { ...user, ...updates } as User;
    setUser(newUser);
  }

  async function signOut() {
    Storage.delete(STORAGE_KEY_AUTH_TOKEN);
    Storage.delete(STORAGE_KEY_AUTH_SESSION);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUser,
        isLoading,
        isLoaded,
        loadUserFromSession,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
