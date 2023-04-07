/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-31 19:35:21
 * @Description:  
 */
declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}


  