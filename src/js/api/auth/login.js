import { headers } from "../headers";
import { save } from "../../storage/save";
import { API_AUTH_LOGIN } from "../constants";

/**
 * This will login a user by sending the email and password to the authentication API.
 * If successful, it stores the access token and user data in local storage.
 * @param {Object} user This is the login parameters.
 * @param {string} user.email This is the user's email.
 * @param {string} user.password This is the user's password.
 * @returns {Promise<Object>} The logged-in user data.
 * @example
 * const user = await login({ email: "example@stud.noroff.no", password: "example123" });
 * console.log(user);
 */
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
