import "./css/style.css";

import router from "./js/router";
import { displayHeader } from "./js/utilities/displayHeader";
import { toggleDropdown } from "./js/utilities/toggleDropdown";

await router(window.location.pathname);

displayHeader();
toggleDropdown();
