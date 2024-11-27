import { headers } from "../headers";
import { save } from "../../storage/save";
import { API_AUTH_LOGIN } from "../constants";

export async function login({ email, password }) {
  const response = await fetch(API_AUTH_LOGIN, {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();
  if (response.ok) {
    const { data } = result;
    save("token", data.accessToken);
    save("user", data.name);
    return data;
  }

  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
