/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 15:20:07
 * @Description:  
 */
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}


  