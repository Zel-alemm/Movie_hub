import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(), // handles all JSX (.js, .jsx) automatically
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "React Entertainment Hub",
        short_name: "REH",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
      },
    }),
  ],
});