/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 15:50:44
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