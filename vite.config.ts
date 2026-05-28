import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
// import viteCompression from 'vite-plugin-compression';
import px2rem from 'postcss-plugin-px2rem';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({ open: false }),
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      resolvers: [VantResolver()],
    }),
    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [VantResolver()],
    }),
    // {
    //   ...viteCompression(),
    //   apply: 'build',
    // },
  ],
  //这里进行配置别名
  resolve: {
    alias: {
      '@': path.resolve('./src'), // @代替src
    },
  },
  css: {
    // preprocessorOptions: {
    //   scss: {
    //     additionalData: '@import "@/assets/styles/index.scss";',
    //   },
    // },
    postcss: {
      plugins: [
        px2rem({
          rootValue: 75,
          minPixelValue: 2, // 小于 2px 不转换
          exclude: /node_modules/i, // 排除 node_modules 目录
        }),
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: false,
    // proxy: {
    //   '/api': {
    //     target: '要代理的地址',
    //     changeOrigin: true,
    //     ws: true,`
    //     rewrite: (path: string) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia', 'vue-router'],
          // elementIcons: ['@element-plus/icons-vue'],
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
