export function activeListingId() {
  const url = new URL(window.location.href);
  return url.searchParams.get("id");
}
