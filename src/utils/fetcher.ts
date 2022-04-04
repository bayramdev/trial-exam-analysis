import { BASE_URL } from "../config";

export const fetcher = (url: string) =>
  fetch(`${BASE_URL}/${url}`).then((res) => res.json());
