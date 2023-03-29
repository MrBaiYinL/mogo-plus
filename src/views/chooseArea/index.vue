<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-15 16:57:36
 * @Description:  
-->
<template>
    <div>
        <mogo-choose-area @change="changeArea"></mogo-choose-area>
    </div>
</template>
<script lang="ts" setup>
const changeArea = (val:any) => {
    console.log(val)
}
</script>
    
<style lang="scss" scoped>
</style>
     