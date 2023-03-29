<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-20 10:09:04
 * @Description:  
-->
<template>
      <mogo-choose-city @changeCity="changeCity" @changeProvince="changeProvince"></mogo-choose-city>
</template>
<script lang="ts" setup>
//
const changeCity = (val: any) => {
    // 
    console.log(val)
}
const changeProvince = (val: string) => {
    // 
    console.log(val)
}
</script>
    
<style lang="scss" scoped>
</style>
  