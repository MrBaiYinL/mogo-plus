<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 11:58:31
 * @Description:  
-->
<template>
    <el-menu  class="el-menu-vertical-demo" :default-active="defaultActive" :router="router" v-bind="$attrs">
        <template v-for="(item,i) in data" :key="i" >
            <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
                <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
                <span>{{ item[name] }}</span>
            </el-menu-item>
            <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
                <template #title>
                    <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
                    <span>{{ item[name] }}</span>
                </template>
                <el-menu-item v-for="(item1,index1) in item[children]" :key="index1" :index="item1[index]">
                    <component v-if="item[icon]" :is="`el-icon-${toLine(item1[icon])}`"></component>
                    <span>{{ item1[name] }}</span>
                </el-menu-item>
            </el-sub-menu>
        </template>
    </el-menu>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { toLine } from '../../../utils';
// $attrs接收父组件传来的数据，且不在props中进行接收定义
const props = defineProps({
    data:{
        type: Array as PropType<any[]>,
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
    // 键名
    // 菜单标题的键名
    name: {
        type: String,
        default: 'name'
    },
    // 菜单标识的键名
    index: {
        type: String,
        default: 'index'
    },
    // 菜单图标的键名
    icon: {
        type: String,
        default: 'icon'
    },
    // 菜单子菜单的键名
    children: {
        type: String,
        default: 'children'
    },
})
</script>
    
<style lang="scss" scoped>

</style>
     