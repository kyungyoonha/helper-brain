export const BACK_URL =
  process.env.NEXT_PUBLIC_BUILD_ENV === "prod"
    ? "https://helper-brain.vercel.app/api"
    : "http://localhost:3000/api";
