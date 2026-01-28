import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import vitePrerender from 'vite-plugin-prerender';

// Routes to prerender for SEO
const routesToPrerender = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/articles',
  '/education',
  '/chat',
  '/donate',
  '/privacy',
  '/terms',
];

const Renderer = vitePrerender.PuppeteerRenderer;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    historyApiFallback: true, // Enable SPA routing for dev server
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: routesToPrerender,
      renderer: new Renderer({
        maxConcurrentRoutes: 4,
        renderAfterTime: 3000, // Wait for React to render and set meta tags
        headless: true,
      }),
      postProcess(renderedRoute) {
        // Minify HTML slightly
        renderedRoute.html = renderedRoute.html
          .replace(/\s{2,}/g, ' ')
          .replace(/\n/g, '');
        return renderedRoute;
      },
    }),
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
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
}));
