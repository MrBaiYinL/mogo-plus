/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-04-07 20:52:59
 * @Description:
 */
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index"
import ElementPlus from "element-plus"
import * as Icons from '@element-plus/icons-vue';
import "element-plus/dist/index.css"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { toLine } from "./utils"
import mogoUI from './components'

// TODO: 引入报错
// import mogoUI from '../dist/index.es'
// import '../dist/style.css'

const app = createApp(App)
// 全局注册图标，牺牲一点性能,因为element-plus改版了，icon为单独的一个包，以单独的组件展示，且为svg
// el-icon-xxx
for (const i in Icons) {
  // 注册全局组建
  app.component(`el-icon-${toLine(i)}`, (Icons as any)[i])
}
// app.use(router).use(ElementPlus).use(mogoUI).mount("#app")
app.use(router).use(ElementPlus, {
  locale: zhCn, // 分页显示中文
}).use(mogoUI)
app.mount("#app")
