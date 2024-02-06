import Storage from "./Storage";

export const STORAGE_KEY_AUTH_TOKEN = "AUTH_TOKEN";
export const STORAGE_KEY_AUTH_SESSION = "AUTH_SESSION";

export type Session = {
  expires: string; // 2023-10-29T21:53:20.185Z,
  user: {
    email: string; // "john@betablox.com"
  };
};

export const getUserToken = async () => {
  return await Storage.getValueFor(STORAGE_KEY_AUTH_TOKEN);
};

export const getUserSession = async () => {
  const value = await Storage.getValueFor(STORAGE_KEY_AUTH_SESSION);

  if (!value) {
    return null;
  }

  const session: Session = JSON.parse(value);

  const nowTime = new Date().valueOf();
  const expiresTimes = new Date(session.expires).valueOf();
  const isExpired = nowTime > expiresTimes;

  if (isExpired) {
    // Purge existing authentication values so user is forced to reauthenticate
    await Storage.delete(STORAGE_KEY_AUTH_TOKEN);
    await Storage.delete(STORAGE_KEY_AUTH_SESSION);
    return null;
  }

  return session;
};
