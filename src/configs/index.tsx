export const BACK_URL =
  process.env.NEXT_PUBLIC_BUILD_ENV?.replace(/\\n/gm, "\n") === "prod"
    ? "https://helper-brain.vercel.app"
    : "http://localhost:3000";
