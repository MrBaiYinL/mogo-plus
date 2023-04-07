/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 16:51:41
 * @Description:  
 */
import {App} from 'vue'
import chooseIcon from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-choose-icon', chooseIcon)
    }
}