import { useState } from "react";
import { LS_TOKEN_KEY } from "../config";

export function useToken() {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem(LS_TOKEN_KEY)
  );

  const saveToken = (value: string | null) => {
    if (value === null) {
      window.localStorage.removeItem(LS_TOKEN_KEY);
    } else {
      window.localStorage.setItem(LS_TOKEN_KEY, value);
    }
    setToken(value);
  };

  return { token, setToken: saveToken };
}
