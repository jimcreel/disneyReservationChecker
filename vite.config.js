import 'dotenv/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname, 'frontend'),
    envFile: path.resolve(__dirname, '.env'),
        server: {
            proxy: {
              '/api': {
                target: 'https://magicres-backend.herokuapp.com',
                changeOrigin: true,
                secure: false,
                ws: true,
              },
            },
          },
})

