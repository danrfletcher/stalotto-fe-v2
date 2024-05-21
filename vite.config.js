// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import graphql from '@rollup/plugin-graphql';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react(), graphql()],
        server: {},
    });
};

