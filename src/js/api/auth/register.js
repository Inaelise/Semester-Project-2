import { headers } from "../headers";
import { API_AUTH_REGISTER } from "../constants";

export async function register({ name, email, password }) {
  const response = await fetch(API_AUTH_REGISTER, {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ name, email, password, credits: 1000 }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data;
  }

  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
