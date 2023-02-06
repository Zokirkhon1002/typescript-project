// vite.config.js / vite.config.ts
import { VitePWA } from "vite-plugin-pwa";

export default {
  plugins: [
    VitePWA({
      mode: "development",
      base: "/",
      strategies: "injectManifest",
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      filename: "custom-sw.ts",
      srcDir: "src",
      manifest: {
        name: "PWA Router",
        short_name: "PWA Router",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png", // <== don't add slash, for testing
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png", // <== don't remove slash, for testing
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png", // <== don't add slash, for testing
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      injectManifest: {
        injectionPoint: undefined,
      },
      devOptions: {
        enabled: process.env.SW_DEV === "true",
        type: "module",
      },
    }),
  ],
};
