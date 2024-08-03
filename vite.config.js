// vite.config.js
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({mode}) => ({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: './src/assets/gallery/*',
                    dest: './assets/gallery',
                },
                {
                    src: './src/lib/*',
                    dest: './lib',
                }
            ],
        }),
    ],
    server: {
        port: 4260,
        strictPort: true
    },
    build: {
        sourcemap: true
    }
}));