import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { LoginCredentials, LoginResponse, User, UserResponse } from "../types";
import { useToken } from "./useToken";

const reqUser = async (token: string): Promise<UserResponse> => {
  const res = await axios.get("me", {
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const reqLogIn = async (cred: LoginCredentials): Promise<LoginResponse> => {
  const res = await axios.post("login", cred, { baseURL: BASE_URL });
  return res.data;
};

export const useAuth = () => {
  const { token, setToken } = useToken();
  const [cachedUser, setCachedUser] = useState<User | null>();

  return {
    token,
    cachedUser,

    loginUser: async (cred: LoginCredentials) => {
      const { user, token, success } = await reqLogIn(cred);
      if (!success) return;

      if (user && token) {
        setCachedUser(user);
        setToken(token);
      }

      return user;
    },

    fetchUser: async () => {
      if (!token) return;
      const { user, success } = await reqUser(token);
      if (success) return;

      if (user) {
        setCachedUser(user);
      }

      return user;
    },

    logOut: async () => {
      setToken(null);
      setCachedUser(null);
    },
  };
};
