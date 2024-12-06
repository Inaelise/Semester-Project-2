import { activeUser } from "./activeUser";
import { onLogout } from "../ui/global/logout";
import { activeNavLink } from "./activeNavLink";

export function displayHeader() {
  const header = document.querySelector("header");
  header.classList.add(
    "bg-main",
    "flex",
    "justify-between",
    "text-white",
    "font-header",
    "font-light",
    "text-small",
    "fixed",
    "w-full",
    "top-0",
    "drop-shadow-[0_1px_15px_rgba(0,0,0,0.25)]",
    "px-6",
    "h-[65px]",
    "z-20"
  );

  if (header) {
    const loggedIn = activeUser();

    if (loggedIn) {
      header.innerHTML = `
      <a href="/" title="Go to home">
        <img class="w-[90px]" src="/images/logo-white.png" alt="Company logo" />
      </a>
      <nav class="fixed top-0 bg-main right-0 pt-16 pb-4 w-[170px] -translate-y-full transition-all duration-500 ease-in-out md:translate-y-0 md:transition-none md:static md:flex md:justify-center md:bg-transparent md:pt-0 md:pb-0">
        <ul class ="flex flex-col gap-4 items-center md:flex-row md:gap-24">
          <li class="hover hover:shadow-none"><a class="home-nav" href="/" title="Go to home">Home</a></li><hr class="line"/>
          <li class="hover hover:shadow-none"><a class="profile-nav" href="/profile/" title="Go to profile">Profile</a></li><hr class="line"/>
          <li>
            <a href="/listing/create/" title="Go to create listing"
              ><div class="bg-white w-[20px] h-[20px] rounded-full flex justify-center items-center hover hover:scale-110"><span class="text-main font-black text-lg">+</span></div></a>
          </li><hr class="line md:hidden"/>
        </ul>
        <div class="pt-4 text-center md:hidden">
        <button class="logout-btn" title="Click to log out">Log out</button>
      </div>
      </nav>
      <div class="hidden md:block md:self-center">
        <button class="logout-btn" title="Click to log out">Log out</button>
      </div>
      <div class="hamburger hover:cursor-pointer self-center md:hidden" title="Click to open/close menu">
        <div class="bar bar-one"></div>
        <div class="bar bar-two"></div>
        <div class="bar bar-three"></div>
      </div>
      `;
      onLogout();
    } else {
      header.innerHTML = `
      <a href="/" title="Go to home">
        <img class="w-[90px]" src="/images/logo-white.png" alt="Company logo" />
      </a>
      <nav class="fixed top-0 bg-main right-0 pt-16 pb-4 w-[170px] -translate-y-full transition-all duration-500 ease-in-out md:translate-y-0 md:transition-none md:pb-0 md:pt-0 md:w-full md:static md:flex md:justify-end md:items-center md:bg-transparent">
        <ul class="flex flex-col gap-4 items-center md:flex-row md:gap-8">
          <li><a class="md:hidden" href="/" title="Go to home">Home</a></li><hr class="line"/>
          <li class="hover hover:shadow-none"><a class="header-btns border" href="/auth/login/" title="Go to login">Log in</a></li><hr class="line"/>
          <li class="hover"><a class="header-btns bg-secondary drop-shadow-btns" href="/auth/register/" title="Go to register">Sign up</a></li>
        </ul>
      </nav>
      <div class="hamburger hover:cursor-pointer self-center md:hidden" title="Click to open/close menu">
        <div class="bar bar-one"></div>
        <div class="bar bar-two"></div>
        <div class="bar bar-three"></div>
      </div>
      `;
    }

    const currentPath = window.location.pathname;
    activeNavLink(currentPath, [
      { selector: ".home-nav", path: "/" },
      { selector: ".profile-nav", path: "/profile/" },
    ]);
  }
}
