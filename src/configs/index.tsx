export const BACK_URL =
  process.env.REACT_APP_BUILD_ENV === "prod"
    ? "/api"
    : "http://localhost:3000/api";
