<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 20:58:39
 * @Description:  
-->
<template>
    <div>
      <!-- <m-notification :value="50"></m-notification>
      <br />
      <br />
      <m-notification :value="50" :max="30"></m-notification>
      <br />
      <br />
      <m-notification :value="50" isDot></m-notification>
      <br />
      <br />
      <m-notification icon="ChatRound" :value="50"></m-notification>-->
      <mogo-notification :value="50">
        <template #default>
          <mogo-list @clickItem="clickItem" @clickAction="clickAction" :list="list" :actions="actions"></mogo-list>
        </template>
      </mogo-notification>
    </div>
</template>
  
<script lang='ts' setup>
  import { list, actions } from './data'
  
  const clickItem = (val: any) => {
    console.log(val)
  }
  const clickAction = (val: any) => {
    console.log(val)
  }
</script>
  
<style lang='scss' scoped>
</style>