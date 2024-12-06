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
