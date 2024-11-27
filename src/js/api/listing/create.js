import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

export async function createListing({
  title,
  description,
  tags,
  media,
  endsAt,
}) {
  const response = await fetch(API_AUCTION_LISTINGS, {
    headers: headers("application/json"),
    method: "post",
    body: JSON.stringify({ title, description, tags, media, endsAt }),
  });

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const errorMessage = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(errorMessage);
}
