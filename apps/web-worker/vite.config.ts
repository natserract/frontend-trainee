import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import react from '@vitejs/plugin-react-swc'
import { lingui } from "@lingui/vite-plugin";
import { comlink } from "vite-plugin-comlink";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    comlink(),
  ],
  worker: {
    plugins: () => [comlink()],
  },
});
