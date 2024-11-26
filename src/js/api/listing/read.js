import { API_AUCTION_LISTINGS } from "../constants";
import { headers } from "../headers";

export async function getListing(id) {
  const response = await fetch(
    `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`,
    {
      headers: headers(),
    }
  );

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const error = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(error);
}

export async function getListings(limit = 9, page = 1) {
  const response = await fetch(
    `${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}&_active=true&_seller=true&_bids=true`,
    {
      headers: headers(),
    }
  );

  const result = await response.json();

  if (response.ok) {
    const { data } = result;
    return data;
  }
  const error = result.errors.map((error) => error.message).join("\r\n");

  throw new Error(error);
}
