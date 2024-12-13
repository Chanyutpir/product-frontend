export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem("jwt_token");

  if (!token && to.path !== "/login") {
    return (location.href = "/login");
  }
});
