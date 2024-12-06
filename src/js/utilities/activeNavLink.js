export function activeNavLink(currentPath, navLinks) {
  navLinks.forEach(({ selector, path }) => {
    const navLink = document.querySelector(selector);
    if (navLink) {
      if (currentPath === path) {
        navLink.classList.add("border-b");
      } else {
        navLink.classList.remove("border-b");
      }
    }
  });
}
