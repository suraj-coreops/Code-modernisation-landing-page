import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// A static site with no backend of its own: it renders, and every action is a
// link out to the console named by VITE_CONSOLE_URL. Nothing here proxies or
// calls an API, which is what makes it deployable anywhere that serves files.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
  server: { port: 5174 },
});
