<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-17 18:09:20
 * @Description:  
-->
<template>
    <el-progress v-bind="$attrs" :percentage="p" ></el-progress>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
const props = defineProps({
    percentage:{
        type:Number,
        default: 0
    },
    isAnimation:{
        type: Boolean,
        default: false
    },
    time: {
        type:Number,
        default: 3000
    }
})
//
let p = ref(0)
onMounted(()=>{
    if (props.isAnimation) {
        // 规定时间内加载完成
        const t = Math.ceil(props.time/props.percentage)
        let timer = setInterval(()=>{
            p.value += 1
            if (p.value >= props.percentage) {
                p.value = props.percentage
                clearInterval(timer)
            }
        }, t)
    } else {
        p.value = props.percentage
    }
})
</script>
    
<style lang="scss" scoped>
    svg {
        width: 126px;
        height: 126px;
    }
</style>
     