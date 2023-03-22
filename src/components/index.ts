/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-21 16:08:48
 * @Description:  
 */
import { App } from "vue";
import chooseAres from "./chooseAres";
import chooseIcon from "./chooseIcon";
import trend from "./trend";
import notification from "./notification";
import list from "./list";
import menu from "./menu";
import progress from "./progress";
import chooseTime from "./chooseTime";
import chooseDate from "./chooseDate";
import chooseCity from "./chooseCity";
import form from "./form";
import modalForm from "./modalForm";

const components = [
    chooseAres,
    chooseIcon,
    trend,
    notification,
    list,
    menu,
    progress,
    chooseTime,
    chooseDate,
    chooseCity, 
    form,
    modalForm,
]

/*
vue全局添加一些功能时，会 采用插件 的模式，有以下两种写法。
    对象类型：一个对象，但必须包含一个install函数，该函数会在安装插件时执行
    函数类型：一个function，此函数会在安装插件时自动执行
    插件可以实现添加 全局的方法或资源
*/
export default {
    install(app: App){
        components.map(item => {
            app.use(item)
        })
    }
}