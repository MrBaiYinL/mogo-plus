/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 17:18:02
 * @Description:  
 */
import {App} from 'vue'
import chooseTime from './src/index.vue'

// 让这个组件可以通过use的形式使用
export default {
    install(app: App){
        app.component('mogo-choose-time', chooseTime)
    }
}