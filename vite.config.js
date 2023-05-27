import 'dotenv/config';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: path.resolve(__dirname, 'frontend'),
    envFile: path.resolve(__dirname, '.env'),
    server: {
        proxy: {
            '/api': {
                target: 'https://magic-reservations.herokuapp.com:3000',
                changeOrigin: true,
                secure: false,
                ws: true,
            }
        }
    }
})

