// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import graphql from '@rollup/plugin-graphql';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react(),graphql()],
    server: {
      proxy: {
        '/graphql': {
          target: process.env.VITE_API_PROXY_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        }
      },
      host: 'stalotto.test',
      https: {
        key: process.env.VITE_MKCERT_KEY,
        cert: process.env.VITE_MKCERT_CERT
      },
    },
  })
};
