export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case "/":
      await import("../src/js/router/views/home.js");
      break;
    case "/auth/login/":
      await import("../src/js/router/views/login.js");
      break;
    case "/auth/register/":
      await import("../src/js/router/views/register.js");
      break;
    case "/listing/":
      await import("../src/js/router/views/listing.js");
      break;
    case "/listing/edit/":
      await import("../src/js/router/views/listingEdit.js");
      break;
    case "/listing/create/":
      await import("../src/js/router/views/listingCreate.js");
      break;
    case "/profile/":
      await import("../src/js/router/views/profile.js");
      break;
  }
}
