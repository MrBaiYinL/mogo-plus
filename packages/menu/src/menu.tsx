/*
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 18:12:46
 * @Description:  
 */
import { menuItemEmits } from "element-plus";
import { defineComponent, PropType, useAttrs } from "vue";
import { toLine } from "../../../utils";
import { MenuItem } from "./types";
import * as Icons from '@element-plus/icons-vue'
import './styles/index.scss'

export default defineComponent ({
    props: {
        data:{  
            type: Array as PropType<MenuItem[]>,
            required: true
        },
        defaultActive: {
            type: String,
            default: ''
        },
        // 是否是路由模式
        router:{
            type: Boolean,
            default: false
        },
        // 菜单标题键名
        name: {
            type: String,
            default: 'name',
        },
        // 菜单图标键名
        icon: {
            type: String,
            default: 'icon',
        },
        // 菜单标识键名
        index: {
            type: String,
            default: 'index',
        },
        // 菜单子菜单键名
        children: {
            type: String,
            default: 'children',
        },
    },
    setup(props, ctx) {
        const renderMenu = (data: any[])=> {
            return data.map((item: any) => {
                // 每个菜单的icon
                item.i=(Icons as any)[item[props.icon]!]
                // 处理sub-menu插槽
                const slots = {
                    title: ()=>{
                        return <><item.i /> <span>{item[props.name]}</span></>
                    }
                }
                // 递归渲染 children
                if (item[props.children] && item[props.children].length) {
                    return (
                        <el-sub-menu  index={item[props.index]} v-slots={slots}>
                            {renderMenu(item[props.children])}
                        </el-sub-menu>
                    )
                }
                // 普通渲染
                return (
                    <el-menu-item index={item[props.index]}>
                        <item.i /> 
                        <span>{item[props.name]}</span>     
                    </el-menu-item>
                )
            })
        }
        // props之外的所有参数
        const attrs = useAttrs()
        return ()=>{
            return (
                <el-menu class="menu-icon-svg" default-active={props.defaultActive} router={props.router} {...attrs}>
                    {renderMenu(props.data)}
                </el-menu>
            )
        }
    }
})