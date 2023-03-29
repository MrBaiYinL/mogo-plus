<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 15:39:09
 * @Description:  
-->
<template>
  <el-button type="primary" @click="handleClick">
    <slot></slot>
  </el-button>
  <div class="mogo-choose-icon-dialog-body-height">
    <el-dialog :before-close="handleClose" :modelValue="dialogVisible" :title="title" > 
      <div class="container">
        <div class="item" v-for="(item,index) in Object.keys(ElIcons)" :key="index" @click="clickItem(item)">
          <div class="text">
            <component :is="`el-icon-${toLine(item)}`"></component>
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
  
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
import { toLine } from '../../../utils'
import { useCopy } from '../../../hooks/useCopy';

const props = defineProps<{
  title: string, // 标题
  visible: boolean // 弹窗控制
}>()
// copy一份父组件的传值参数, 不然相当于 会直接修改父组件的参数，不符合单项数据流的规则 
const dialogVisible = ref<boolean>(props.visible)
const emits = defineEmits(['handleDialog'])
const handleClick = () => {
  // 修改父组件
  emits('handleDialog', !props.visible)
}
const clickItem = (item:string) =>{
  const text = `<el-icon-${toLine(item)} />`
  useCopy(text)
  dialogVisible.value = false
}
const handleClose = () => {
  emits('handleDialog', !props.visible)
}
// 监听visible的变化 只能监听第一次的变化
watch(() => props.visible, val => {
  dialogVisible.value = val
})
// 监听组件内部的dialogVisible变化
watch(() => dialogVisible.value, val => {
  emits('handleDialog', val)
})
</script>
      
<style lang="scss" scoped> 
.container{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.item {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  cursor: pointer;
  height: 70px;
}
.text{
  font-size: 14px;
}
.icon{
  flex: 1;
}
svg{
  width: 2em;
  height: 2em;
}
</style>
      