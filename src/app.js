import "../src/css/style.css";
import { displayHeader } from "../src/js/utilities/displayHeader";
import { toggleDropdown } from "../src/js/utilities/toggleDropdown";
import router from "../src/js/router/index";

displayHeader();
toggleDropdown();
await router(window.location.pathname);
