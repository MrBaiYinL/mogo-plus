/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-16 14:42:52
 * @Description:  
 */
export interface MenuItem {
    icon?: string,
    i?: any, // 处理后的icons
    name: string,
    index: string,
    children?: MenuItem[],
}