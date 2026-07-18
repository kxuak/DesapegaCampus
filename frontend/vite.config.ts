import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    babel({
      presets: [reactCompilerPreset()],
    }),

    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        navigateFallback: "index.html",
        },

      manifest: {
        name: "Desapega Campus",
        short_name: "Desapega",
        description:
          "Marketplace universitário para compra, venda e doação de materiais acadêmicos.",

        theme_color: "#2F6FED",
        background_color: "#090B10",

        display: "standalone",

        orientation: "portrait",

        start_url: "/",

        scope: "/",

        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },

          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },

          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          }
        ],
      },
    }),
  ],
});