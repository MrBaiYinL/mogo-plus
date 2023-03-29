<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 16:11:26
 * @Description:  
-->
<template>
    <div style="display: flex">
        <div style="margin-right: 10px">
            <el-date-picker v-model="startDate" type="date" :placeholder="startPlaceholder" :disabledDate="startDisabledDate" v-bind="$attrs.startOptions"></el-date-picker>
        </div>
        <div>
            <el-date-picker v-model="endDate" type="date" :placeholder="endPlaceholder" :disabled="endDateDisabled" :disabledDate="endDateDisabledDate" v-bind="$attrs.endOptions"></el-date-picker>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

//
const props = defineProps({
    startPlaceholder: {
        type: String,
        default: '请选择开始日期'
    },
    endPlaceholder: {
        type: String,
        default: '请选择结束日期'
    },
    // 是否禁止选择今天之前的日期
    disabledToday: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits(['startChange', 'endChange'])
//
const startDate = ref<Date | null>(null) 
const endDate = ref<Date | null>(null)
// 禁用结束日期的状态
const endDateDisabled = ref<boolean>(true)
// 禁用开始日期的函数
const startDisabledDate = (time: Date) => {
    if (props.disabledToday) {
        return time.getTime() < Date.now() - 1000*60*60*24
    }
}

// 禁用结束日期
const endDateDisabledDate = (time: Date) => {
    if (startDate.value) {
        return time.getTime() < startDate.value.getTime() + 1000*60*60*24
    }
}
// 监听开始日期
watch(()=> startDate.value,(val)=>{
    if (!val) {
        endDateDisabled.value = true
        endDate.value = null
    } else {
        emits('startChange', val)
        endDateDisabled.value = false
    }
})
// 监听结束日期
watch(()=> endDate.value,(val)=>{
    if (val) {
        emits('endChange', {
            startDate: startDate.value,
            endDate: val
        })
    }
})

</script> 
    
<style lang="scss" scoped>
</style>
       