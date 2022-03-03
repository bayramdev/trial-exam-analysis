import { useState } from "react";
import { LoginCredentials, LoginResponse, User } from "../types";
import { useToken } from "./useToken";

const EXAMPLE_USER: User = {
  userID: "My User ID",
  schoolName: "My School Name",
  schoolID: "My School ID",
  userType: "superAdmin",
};

const reqUser = async (token: string): Promise<User> => {
  return EXAMPLE_USER;
};

const reqLogIn = async (cred: LoginCredentials): Promise<LoginResponse> => {
  return { user: EXAMPLE_USER, token: "Example token" };
};

export const useAuth = () => {
  const { token, setToken } = useToken();
  const [cachedUser, setCachedUser] = useState<User | null>();

  return {
    token,
    cachedUser,

    loginUser: async (cred: LoginCredentials) => {
      const { user, token } = await reqLogIn(cred);
      setCachedUser(user);
      setToken(token);
      return user;
    },

    fetchUser: async () => {
      if (!token) return null;
      const userRes = await reqUser(token);
      setCachedUser(userRes);
      return userRes;
    },

    logOut: async () => {
      setToken(null);
      setCachedUser(null);
    },
  };
};
