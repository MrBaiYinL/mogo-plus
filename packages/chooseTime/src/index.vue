<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 11:40:50
 * @Description:  
-->
<template>
    <div style="display: flex">
        <div style="margin-right: 20px">
            <el-time-select
                v-model="startTime"
                :placeholder="startPlaceholder"
                :start="startTimeStart"
                :step="startStep"
                :end="startTimeEnd"
                v-bind="$attrs.startOptions"
            ></el-time-select>
        </div>
        <div>
            <el-time-select
                v-model="endTime"
                :placeholder="endPlaceholder"
                :start="endTimeStart"
                :step="endStep"
                :end="endTimeEnd"
                :disabled="endTimeDisabled"
                v-bind="$attrs.endOptions"
            ></el-time-select>
        </div>
    </div>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'
//
const props = defineProps({
    startPlaceholder: {
        type: String,
        default: '请选择开始时间'
    },
    startTimeStart: {
        type: String,
        default: '08:00'
    },
    startStep: {
        type: String,
        default: '00:30'
    },
    startTimeEnd: {
        type: String,
        default: '24:00'
    },
    endPlaceholder: {
        type: String,
        default: '请选择结束时间'
    },
    endTimeStart: {
        type: String,
        default: '08:00'
    },
    endStep: {
        type: String,
        default: '00:30'
    },
    endTimeEnd: {
        type: String,
        default: '24:00'
    },
})
const emits = defineEmits(['startChange', 'endChange'])


const startTime = ref<string>('')
const endTime = ref<string>('')
const endTimeDisabled = ref<boolean>(true)

watch(()=> startTime.value,(val)=>{
   if (val === '') {
    endTime.value = ''
    endTimeDisabled.value = true
   } else {
    endTimeDisabled.value = false
    emits('startChange', val)
   }
})
watch(()=> endTime.value,(val)=>{
 // 
    if (val !== '') {
        emits('endChange', {startTime: startTime.value, endTime: val})
    }
    
})
 
</script>
    
<style lang="scss" scoped>
</style>
     