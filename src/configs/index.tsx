const env = process.env.NEXT_PUBLIC_BUILD_ENV || "";

export const BACK_URL =
  env.replace(/\\n/g, "\n") === "prod"
    ? "https://helper-brain.vercel.app"
    : "http://localhost:3000";
