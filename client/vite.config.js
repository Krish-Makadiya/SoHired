import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import {visualizer} from "rollup-plugin-visualizer";

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: "dist/stats.html",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
