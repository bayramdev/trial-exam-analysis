export const LS_TOKEN_KEY = "access_key";

export const BASE_URL = (() => {
  const url = process.env.REACT_APP_BASE_URL;
  if (!url) {
    throw "Can't read REACT_APP_BASE_URL env var";
  }
  return url;
})();
