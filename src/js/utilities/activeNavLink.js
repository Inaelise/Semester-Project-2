/**
 * This will Highlight the active navigation link by adding a border at the bottom to indicate the current page.
 * @param {string} currentPath - The current URL path.
 * @param {Array<{ selector: string, path: string }>} navLinks - An array of objects containing the selector for the navigation link (`selector`) and its corresponding path (`path`).
 */
export function activeNavLink(currentPath, navLinks) {
  navLinks.forEach(({ selector, path }) => {
    const navLink = document.querySelector(selector);
    if (navLink) {
      if (currentPath === path) {
        navLink.classList.add("border-b", "pb-[2px]");
      } else {
        navLink.classList.remove("border-b", "pb-[2px]");
      }
    }
  });
}
