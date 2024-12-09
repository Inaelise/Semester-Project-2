import { headers } from "../headers";
import { API_AUTH_REGISTER } from "../constants";

/**
 * This will register a user by sending their information to Noroff's register API.
 * @param {Object} user This is the register parameters.
 * @param {string} user.name This is the name of the user
 * @param {string} user.email This is the user's email
 * @param {string} user.password This is the user's password
 * @returns {Promise<Object>} The registered user data.
 * @example
 * const registerUser = await register({
 * name: "Kari",
 * email: "kari.normann@stud.noroff.no",
 * password: "12345678"
 * });
 * console.log(registerUser);
 */
export async function register({ name, email, password }) {
  const response = await fetch(API_AUTH_REGISTER, {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ name, email, password, credits: 1000 }),
  });

  const result = await response.json();
  if (response.ok) {
    const { data } = result;
    return data;
  }

  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
