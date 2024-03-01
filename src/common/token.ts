// Polyfill for jwt-decode to work in react native environment
// This should be supported natively with REact Native 74
// @see - https://github.com/auth0/jwt-decode/issues/241
import "core-js/stable/atob";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Storage from "@/services/Storage";

export const STORAGE_KEY_ACCESS_TOKEN = "ACCESS_TOKEN";
export const STORAGE_KEY_REFRESH_TOKEN = "REFRESH_TOKEN";
export const STORAGE_KEY_USER = "USER";

export function tokenIsExpired(token: string): boolean {
  console.debug("checking token is expired", token);
  const decodedToken = jwtDecode<JwtPayload>(token);

  if (!token || !decodedToken.exp) {
    return true;
  }

  const currentTimestamp = Date.now() / 1000;
  return decodedToken.exp < currentTimestamp;
}

export async function getAccessTokenFromStorage(): Promise<string | null> {
  return await Storage.getValueFor(STORAGE_KEY_ACCESS_TOKEN);
}

export async function getRefreshTokenFromStorage(): Promise<string | null> {
  return await Storage.getValueFor(STORAGE_KEY_REFRESH_TOKEN);
}
