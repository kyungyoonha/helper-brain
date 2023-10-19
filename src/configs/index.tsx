export const BACK_URL =
  process.env.NEXT_PUBLIC_BUILD_ENV?.replace(/\\n/gm, "\n") === "prod"
    ? "https://helper-brain.vercel.app"
    : "http://localhost:3000";

export const SCREENS = {
  sm: "512px",
  md: "769px",
  lg: "1068px",
  xl: "1280px",
  "2xl": "1536px",
};
