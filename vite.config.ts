/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-16 14:28:09
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
})
