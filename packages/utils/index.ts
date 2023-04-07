/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 09:49:30
 * @Description:
 */

// 驼峰转换横杠连接转小写
export const toLine = (value: string) => {
  return value.replace(/A-Z/g, "-$1").toLocaleLowerCase()
}
