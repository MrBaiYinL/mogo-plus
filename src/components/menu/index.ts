/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-16 14:33:58
 * @Description:  
 */
import {App} from 'vue'
import menu from './src/index.vue'
import infiniteMenu from './src/menu'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-menu', menu)
        app.component('mogo-infinite-menu', infiniteMenu)
    }
}