import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    plugins: [
      // This is exactly how the new Lovable config wants Nitro injected
      require("nitro/vite").nitro({
        preset: "vercel",
      }),
    ],
  },
});