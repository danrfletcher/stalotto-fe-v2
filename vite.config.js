// vite.config.js
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

console.log(process.env.VITE_MKCERT_KEY)

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react()],
    server: {
      host: 'stalotto.test',
      https: {
        key: process.env.VITE_MKCERT_KEY,
        cert: process.env.VITE_MKCERT_CERT
      },
    },
  })
};
