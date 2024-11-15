const AUTH_ROUTE = ["/"];
const PROTECTED_ROUTES = ["/products", "/product"];
const LOGIN_REDIRECT = "/products";
const UNAUTHENTICATED_REDIRECT = "/?state=unauthenticated";

export {
  PROTECTED_ROUTES,
  LOGIN_REDIRECT,
  UNAUTHENTICATED_REDIRECT,
  AUTH_ROUTE,
};
