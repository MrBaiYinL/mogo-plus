/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 20:42:03
 * @Description:  
 */
import {App} from 'vue'
import list from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-list', list)
    }
}