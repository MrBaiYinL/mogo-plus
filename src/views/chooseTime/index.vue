<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 16:13:54
 * @Description:  
-->
<template>
    <p>时间选择器</p><br />
    <mogo-choose-time :startOptions="startOptions" :endOptions="endOptions" @startChange="startChange" @endChange="endChange"></mogo-choose-time>
    <br />
    <p>日期选择器</p><br />
    <mogo-choose-date :startOptions="startDateOptions" :endOptions="endDateOptions" @startChange="dateStartChange" @endChange="dateEndChange"></mogo-choose-date>
</template>
<script lang="ts" setup>
//
interface endValue{
    startTime: string,
    endTime: string
}
interface endDateValue {
    startDate: Date,
    endDate: Date
}
const startChange = (val:String) =>{
    console.log(val)
}
const endChange = (val:endValue) =>{
    console.log(val)
}
// 开始时间和结束时间：其它的属性 通过下面的字段进行定义，通过$attrs 进行查看
const startOptions = {
    // size: 'small',
    // clearable: false
}
const endOptions = {
    // size: '',
    // clearable: false
}

// 日期
const dateStartChange = (val: Date) => {
    //
    console.log('dateStartChange', val)
}
const dateEndChange = (val:endDateValue) => {
    // 
    console.log('dateEndChange', val)
}
const startDateOptions = {
    // size: 'small',
    // clearable: false
}
const endDateOptions = {
    // size: '',
    // clearable: false
}

</script>
    
<style lang="scss" scoped>
</style>
     