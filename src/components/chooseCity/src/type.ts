/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 20:57:35
 * @Description: inter
 */
export interface City {
    id: number,
    spell: string,
    name: string
}

export interface Province {
    name: string,
    data: string[],
    id?: string
}
