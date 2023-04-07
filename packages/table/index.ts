/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-22 20:22:15
 * @Description:  
 */
import {App} from 'vue'
import table from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-table', table)
    }
}