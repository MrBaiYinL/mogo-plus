/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-20 16:29:40
 * @Description:  
 */
import {App} from 'vue'
import form from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-form', form)
    }
}