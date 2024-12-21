import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import pxToRem from "postcss-pxtorem";
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  css: {
    postcss: {
      plugins: [
        pxToRem({
          rootValue: 37.5,
          propList: ["*"],
          unitPrecision: 8,
          selectorBlackList: ["-ignore", "html"],
          replace: true,
          mediaQuery: false,
          minPixelValue: 0.1,
        }),
      ],
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保这里使用 alias
    }
  }
});
