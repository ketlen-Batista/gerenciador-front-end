import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const processEnvValues = {
    'process.env': Object.entries(env).reduce((prev, [key, val]) => {
      return {
        ...prev,
        [key]: val,
      };
    }, {}),
  };

  return {
    server: {
      port: Number(env.VITE_MOBIGESTOR_PORT ?? 4000),
      proxy: {
        '/test-api': {
          ws: true,
          changeOrigin: true,
          target: env.VITE_MOBIGESTOR_API,
        },
      },
    },
    define: processEnvValues,
    plugins: [react(), tsconfigPaths(), svgr()],
  };
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
