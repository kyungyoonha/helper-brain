export const BACK_URL =
  process.env.BUILD_ENV === "prod"
    ? "https://helper-brain.vercel.app/api"
    : "http://localhost:3000/api";
