import * as SecureStore from "expo-secure-store";

const Storage = {
  save: async function (key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  },

  getValueFor: async function (key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key);
  },

  delete: async function (key: string): Promise<void> {
    return await SecureStore.deleteItemAsync(key);
  },
};

export default Storage;
