import { createAuthClient } from "better-auth/react";
import { config } from "./config";

export const authClient = createAuthClient({
  baseURL: config.authUrl,
  credentials: "include", // This ensures cookies are sent with requests
});
