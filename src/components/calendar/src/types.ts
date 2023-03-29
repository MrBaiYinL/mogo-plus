/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-24 10:23:06
 * @Description:  
 */
export interface EventItem {
    // 事件标题
    title: string,
    // 开始时间
    start: string,
    // 结束时间
    end: string,
    // 是否可拖动编辑
    editable?: boolean
  }