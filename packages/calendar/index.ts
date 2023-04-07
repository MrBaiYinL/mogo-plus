/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 10:07:12
 * @Description:  
 */
import {App} from 'vue'
import calendar from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-calendar', calendar)
    }
}