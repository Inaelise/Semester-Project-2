import { remove } from "../../storage/remove";

export function logout() {
  remove("token");
  remove("user");
}
