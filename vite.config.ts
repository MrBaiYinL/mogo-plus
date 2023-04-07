/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-31 14:25:21
 * @Description:
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJSX from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJSX()
  ],
  server: {
    port: 8080,
    // hmr: {
    //   overlay: false,
    // },
  },
  optimizeDeps: {
    include: ['dist']
  }
})

/**
 * vue({
      template:{
        // 添加以下内容
        compilerOptions:{
          isCustomElement: tag => tag.startsWith('mogo-')
        }
      }
    }),
 */
