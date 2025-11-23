import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true, // Enable SPA routing for dev server
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    chunkSizeWarningLimit: 1000, // Increase warning threshold to 1000KB (1MB)
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Node modules chunking
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // React Router
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Radix UI components (grouped)
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Supabase
            if (id.includes('@supabase')) {
              return 'vendor-supabase';
            }
            // React Query
            if (id.includes('@tanstack/react-query')) {
              return 'vendor-query';
            }
            // Charts
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            // Other large dependencies
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // All other node_modules
            return 'vendor-other';
          }
        },
      },
    },
  },
}));
