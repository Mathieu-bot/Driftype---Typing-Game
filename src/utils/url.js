export const API_URL =
  window.location.hostname === "127.0.0.1"
    ? "http://localhost:3000/api"
    : "https://driftype-backend-production.up.railway.app/api";
