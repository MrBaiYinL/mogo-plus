<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-16 15:05:32
 * @Description:  侧边栏
-->
<template>
  <!-- <el-menu
    :collapse="collapse"
    class="el-menu-vertical-demo"
    default-active="2"
  >
    <el-menu-item index="1">
      <el-icon><el-icon-menu /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><el-icon-document /></el-icon>
      <span>图标选择器</span>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><el-icon-document /></el-icon>
      <span>趋势标记</span>
    </el-menu-item>
  </el-menu> -->
  <!-- 当前高亮的菜单，肯定是当前路由的路径，所以设置 :defaultActive="$route.path" -->
  <mogo-menu :collapse="collapse" :data="data" router :defaultActive="$route.path" ></mogo-menu>
</template>
<script lang="ts" setup>
const props = defineProps<{ collapse: boolean }>();
const data = [
  {
    icon: 'HomeFilled',
    name: '首页',
    index: '/'
  },
  {
    icon: 'Check',
    name: '图标选择器',
    index: '/chooseIcon'
  },
  {
    icon: 'Location',
    name: '省市区选择',
    index: '/chooseArea'
  },
  {
    icon: 'Sort',
    name: '趋势标记',
    index: '/trend'
  },
  {
    icon: 'Timer',
    name: '时间选择',
    index: '/chooseTime'
  },
  {
    icon: 'Bell',
    name: '通知菜单',
    index: '/notification'
  },
  {
    icon: 'Menu',
    name: '导航菜单',
    index: '/menu'
  },
  {
    icon: 'TurnOff',
    name: '城市选择',
    index: '/chooseCity'
  },
  {
    icon: 'DArrowRight',
    name: '进度条',
    index: '/progress'
  },
  {
    icon: 'ScaleToOriginal',
    name: '日历',
    index: '/calendar'
  },
  {
    icon: 'Setting',
    name: '表单',
    index: '/form'
  },
  {
    icon: 'Setting',
    name: '弹出框表单',
    index: '/modalForm'
  },
  {
    icon: 'ShoppingBag',
    name: '表格',
    index: '/table'
  }
]
</script>
    
<style lang="scss" scoped>

</style>
    