import axios, { AxiosResponse } from "axios";
import Storage from "./Storage";
import {
  STORAGE_KEY_AUTH_TOKEN,
  STORAGE_KEY_AUTH_SESSION,
  getUserToken,
} from "./Auth";
import { User } from "@/models/User";

const apiUrl = (path: string) => ``;

const TEST_USER = {
  id: 1,
  email: "john@betablox.com",
  firstName: "John",
  lastName: "Rake",
} as User;

const TEST_TOKEN = "token_635A9857A453BF26BEAA9AE293672";
const TEST_SESSION = {
  iss: "Expo Template",
  iat: Date.now(),
  exp: Date.now() + 30 * 60 * 1000, // 30 minutes from now
  sub: "john@betablox.com",
};

const Api = {
  auth: {
    register: async (data: object) => {
      // Put your API request logic here

      Storage.save(STORAGE_KEY_AUTH_TOKEN, TEST_TOKEN);
      Storage.save(STORAGE_KEY_AUTH_SESSION, JSON.stringify(TEST_SESSION));

      return new Promise((resolve, reject) => {
        return resolve(TEST_USER);
      });
    },
    /**
     * Sign in a user with email and password credentials.
     */
    signInWithEmailAndPassword: async (email: string, password: string) => {
      console.log("authenticating user with email and password");

      // Put your API request logic here

      Storage.save(STORAGE_KEY_AUTH_TOKEN, TEST_TOKEN);
      Storage.save(STORAGE_KEY_AUTH_SESSION, JSON.stringify(TEST_SESSION));

      return TEST_SESSION;
    },
    signOut: async () => {
      // Put your API request logic here
    },
    sendPasswordResetEmail: async (email: string): Promise<AxiosResponse> => {
      const config = await apiRequestConfig();
      return await axios.post(
        apiUrl("/auth/forgot-password"),
        { email },
        config
      );
    },
    resetPassword: async (
      email: string,
      password: string,
      token: string
    ): Promise<AxiosResponse> => {
      const config = await apiRequestConfig();
      return await axios.post(
        apiUrl("/auth/password-reset"),
        { email, password, token },
        config
      );
    },
  },
  user: {
    me: async (): Promise<User | undefined> => {
      const config = await apiRequestConfig();
      return new Promise((resolve, reject) => {
        return resolve(TEST_USER);
      });
    },
  },
};

async function apiRequestConfig() {
  const token = await getUserToken();

  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
}

export default Api;
