/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-21 16:06:50
 * @Description:  
 */
import {App} from 'vue'
import modalForm from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-modal-form', modalForm)
    }
}