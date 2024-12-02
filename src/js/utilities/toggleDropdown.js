export function toggleDropdown() {
  const navElements = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const barOne = document.querySelector(".bar-one");
  const barTwo = document.querySelector(".bar-two");
  const barThree = document.querySelector(".bar-three");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    if (navElements.classList.contains("-translate-y-full")) {
      navElements.classList.remove("-translate-y-full");
      navElements.classList.add("translate-0");
      barTwo.classList.add("opacity-0");
      barOne.classList.add("rotate-45", "translate-y-[7px]");
      barThree.classList.add("-rotate-45", "-translate-y-[7px]");
    } else {
      navElements.classList.remove("translate-0");
      navElements.classList.add("-translate-y-full");
      barTwo.classList.remove("opacity-0");
      barOne.classList.remove("rotate-45", "translate-y-[7px]");
      barThree.classList.remove("-rotate-45", "-translate-y-[7px]");
    }
  });

  document.addEventListener("click", (e) => {
    if (!navElements.contains(e.target) && !hamburger.contains(e.target)) {
      navElements.classList.remove("translate-0");
      navElements.classList.add("-translate-y-full");
      barTwo.classList.remove("opacity-0");
      barOne.classList.remove("rotate-45", "translate-y-[7px]");
      barThree.classList.remove("-rotate-45", "-translate-y-[7px]");
    }
  });
}
