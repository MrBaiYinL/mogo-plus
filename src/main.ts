/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 18:34:41
 * @Description:
 */
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import ElementPlus from "element-plus"
import * as Icons from '@element-plus/icons-vue';
import "element-plus/dist/index.css"
import { toLine } from "./utils"
import mogoUI from './components'

// TODO: 引入报错
// import * as mogoUI from '../dist/mogo-element-plus.umd.cjs'

const app = createApp(App)
// 全局注册图标，牺牲一点性能,因为element-plus改版了，icon为单独的一个包，以单独的组件展示，且为svg
// el-icon-xxx
for (const i in Icons) {
  // 注册全局组建
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}
app.use(router).use(ElementPlus).use(mogoUI)
app.mount("#app")
