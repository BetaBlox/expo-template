import { User } from "@/models/User";
import { createContext, useContext, useState } from "react";
import Storage from "@/services/Storage";
import { HttpMethod, customFetch } from "@/common/custom-fetch";
import {
  getRefreshTokenFromStorage,
  getAccessTokenFromStorage,
  tokenIsExpired,
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_REFRESH_TOKEN,
  STORAGE_KEY_USER,
} from "@/common/token";

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

interface AuthContextI {
  isLoaded: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string | null | undefined;
  user: User | null | undefined;
  signup(payload: object): Promise<Response>;
  signin(email: string, password: string): Promise<Response>;
  loadUserProfile(): Promise<void>;
  updateUserProfile(updates: object): Promise<void>;
  signout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  changePassword: (password: string) => Promise<Response>;
}

const defaultValues = {
  // indicates that the auth provider has full initialized
  // from memory/short-term storage
  isLoaded: false,
  isLoading: true,
  isAuthenticated: false,
  email: null,
  user: null,
  signup: () => Promise.resolve(null as unknown as Response),
  signin: () => Promise.resolve(null as unknown as Response),
  loadUserProfile: () => Promise.resolve(),
  updateUserProfile: () => Promise.resolve(),
  signout: () => Promise.resolve(),
  refreshAccessToken: () => Promise.resolve(),
  loadFromStorage: () => Promise.resolve(),
  changePassword: () => Promise.resolve(null as unknown as Response),
};

export const AuthContext = createContext<AuthContextI>(defaultValues);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children?: React.ReactNode;
}
export function AuthProvider({ children }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [email, setEmail] = useState<string>();
  const [user, setUser] = useState<User>();
  const [authTokens, setAuthTokens] = useState<AuthTokens>({
    accessToken: null,
    refreshToken: null,
  });

  async function signup(data: object): Promise<Response> {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      setIsAuthenticated(true);
      setEmail(email);
      await Storage.save(STORAGE_KEY_ACCESS_TOKEN, accessToken);
      await Storage.save(STORAGE_KEY_REFRESH_TOKEN, refreshToken);
      await loadUserProfile();
    }
    return response;
  }

  async function signin(email: string, password: string): Promise<Response> {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (response.ok) {
      const { accessToken, refreshToken } = await response.json();
      setIsAuthenticated(true);
      setEmail(email);
      await Storage.save(STORAGE_KEY_ACCESS_TOKEN, accessToken);
      await Storage.save(STORAGE_KEY_REFRESH_TOKEN, refreshToken);
      await loadUserProfile();
    }
    return response;
  }

  async function loadUserProfile(): Promise<void> {
    const { response, data } = await customFetch(
      "http://localhost:3000/api/auth/profile"
    );

    if (response.ok) {
      setUser(data);
      setEmail(data.email);
    }
  }

  async function updateUserProfile(updates: object): Promise<void> {
    const { data } = await customFetch(
      "http://localhost:3000/api/auth/profile",
      {
        method: HttpMethod.POST,
        body: JSON.stringify(updates),
      }
    );
    setUser(data);
    setEmail(data.email);
  }

  async function signout(): Promise<void> {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: HttpMethod.GET,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
    });

    setIsAuthenticated(false);
    setEmail(undefined);
    setUser(undefined);
    setAuthTokens({
      accessToken: null,
      refreshToken: null,
    });

    Storage.delete(STORAGE_KEY_ACCESS_TOKEN);
    Storage.delete(STORAGE_KEY_REFRESH_TOKEN);
    Storage.delete(STORAGE_KEY_USER);
  }

  async function refreshAccessToken(): Promise<void> {
    const token = await getRefreshTokenFromStorage();
    console.log("user token is expired. Attempting to refresh.");
    const response = await fetch("http://localhost:3000/api/auth/refresh", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log("user token successfully refreshed");
      const { accessToken, refreshToken } = await response.json();
      setAuthTokens({
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      Storage.save(STORAGE_KEY_ACCESS_TOKEN, accessToken);
      Storage.save(STORAGE_KEY_REFRESH_TOKEN, refreshToken);
    } else {
      await signout();
    }
  }

  async function loadFromStorage(): Promise<void> {
    setIsLoading(true);

    console.log("loading user authentication from storage");
    const accessToken = await getAccessTokenFromStorage();
    const refreshToken = await getRefreshTokenFromStorage();

    const isAuthenticated =
      accessToken && tokenIsExpired(accessToken) === false;

    if (isAuthenticated) {
      console.log("user is authenticated via access token");
      // User access token is still valid we don't need to do anything
      setAuthTokens({ accessToken, refreshToken });
      setIsAuthenticated(true);
      setIsLoaded(true);
      setIsLoading(false);
      await loadUserProfile();
      return;
    }

    const isExpired = accessToken && tokenIsExpired(accessToken);
    if (isExpired) {
      // Access token exists, but is expired. Let's try to refresh before kicking the user out
      setAuthTokens({ accessToken, refreshToken });

      await refreshAccessToken();

      setIsAuthenticated(true);
      setIsLoaded(true);
      setIsLoading(false);

      await loadUserProfile();
      return;
    }

    // We've failed to prove if the token is expired or valid.
    // Kick the user out because we can't be sure what's going on.
    setIsLoaded(true);
    setIsLoading(false);
    await signout();
  }

  async function changePassword(password: string): Promise<Response> {
    const response = await fetch(
      "http://localhost:3000/api/auth/change-password",
      {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.accessToken}`,
        },
        body: JSON.stringify({ password }),
      }
    );
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoaded,
        isLoading,
        isAuthenticated,
        email,
        user,
        signup,
        signin,
        loadUserProfile,
        updateUserProfile,
        signout,
        refreshAccessToken,
        loadFromStorage,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
