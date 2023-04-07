/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 16:20:22
 * @Description:  
 */
import {App} from 'vue'
import chooseCity from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-choose-city', chooseCity)
    }
}