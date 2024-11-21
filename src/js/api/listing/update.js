import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

export async function updateListing(id, { title, description, tags, media }) {
  const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
    headers: headers("application/json"),
    method: "put",
    body: JSON.stringify({ title, description, tags, media }),
  });

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    //Temporary alert
    alert(`Post with id: ${id} was updated!`);
    return data;
  }

  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
