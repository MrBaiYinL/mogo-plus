<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-31 16:06:56
 * @Description:  
-->
<template>
    <div class="demo">
        <mogo-progress isAnimation :percentage="60"></mogo-progress>
        <mogo-progress type="circle" :percentage="60"></mogo-progress>
        <mogo-progress type="circle" isAnimation :percentage="60"></mogo-progress>
        <mogo-progress isAnimation :stroke-width="22" :text-inside="true" status="warning" :percentage="60"></mogo-progress>
    </div>
   </template>
<script lang="ts" setup>
//
</script>
    
<style lang="scss" scoped>

</style>
     