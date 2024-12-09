/**
 * This will get the `id` query parameter from the current URL.
 * @returns {string|null} The value of the `id` query parameter, or `null` if the parameter is not found.
 */
export function activeListingId() {
  const url = new URL(window.location.href);
  return url.searchParams.get("id");
}
