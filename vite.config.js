import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    // Base path is driven by VITE_BASE_PATH so staging and production
    // can deploy to different sub-paths without code changes.
    base: env.VITE_BASE_PATH || '/Tradazone/',
    build: {
      // Enable compressed size reporting for monitoring bundle sizes
      reportCompressedSize: true,
      // Set chunk size warnings to prevent large bundles
      chunkSizeWarningLimit: 500, // KB
      rollupOptions: {
        output: {
          // Manual chunking to optimize loading
          manualChunks: {
            // Separate wallet-related code into its own chunk
            wallet: ['@lobstrco/signer-extension-api', 'get-starknet', 'ethers'],
            // UI libraries
            ui: ['lucide-react'],
            // Auth context and related
            auth: ['react-router-dom'],
          },
        },
      },
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      setupFiles: './src/test/setup.js',
    },
  }
})
