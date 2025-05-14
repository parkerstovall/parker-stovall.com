import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

const fullReloadAlways = {
  handleHotUpdate({ server }) {
    server.ws.send({ type: 'full-reload' })
    return []
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    fullReloadAlways,
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': resolve(__dirname, './src'),
    },
  },
})
