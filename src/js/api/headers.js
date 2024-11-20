import { API_KEY } from "./constants";
import { load } from "../storage/load";

export const headers = (contentType) => {
  const token = load("token");
  const headers = {};

  if (API_KEY) {
    headers["X-Noroff-API-KEY"] = API_KEY;
  }

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
