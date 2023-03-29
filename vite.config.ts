/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 15:40:02
 * @Description:
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJSX from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),vueJSX()],
  server: {
    port: 8080,
  },
  optimizeDeps: {
    include: ['dist']
}
})
