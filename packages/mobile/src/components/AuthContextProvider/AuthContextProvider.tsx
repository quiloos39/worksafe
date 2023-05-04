// import * as SecureStore from "expo-secure-store";
import { createContext, useLayoutEffect, useState } from "react";
import { client } from "../../lib/client";

type AuthContextType = {
  token?: string;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>();

  useLayoutEffect(() => {
    async function fetchToken() {
      // const token = await SecureStore.getItemAsync("token");
      if (token) {
        client.client.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        };
        setToken(token);
      }
    }
    fetchToken();
  }, []);

  return <AuthContext.Provider value={{ token, setToken }}>{children}</AuthContext.Provider>;
};
