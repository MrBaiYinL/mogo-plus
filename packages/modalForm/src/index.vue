<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-21 18:28:52
 * @Description:  
-->
<template>
    <div :class="{ 'mogo-choose-icon-dialog-body-height': isScroll }">
        <el-dialog
            v-model="dialogVisible"
            v-bind="$attrs"
        >
            <template #default>
                <mogo-form ref="form" label-width="100px" :options="options"
                    @on-change="onChange"
                    @before-upload="beforeUpload"
                    @on-preview="onPreview"
                    @on-remove="onRemove"
                    @before-remove="beforeRemove"
                    @on-success="onSuccess"
                    @on-exceed="onExceed"
                >
                    <template #uploadArea>
                        <slot name="uploadArea"></slot>
                    </template>
                    <template #uploadTip>
                        <slot name="uploadTip"></slot>
                    </template>
                </mogo-form>
            </template>
            <template #footer>
                <slot name="footer" :form="form"></slot>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { FormInstance } from "element-plus"
import { PropType, ref, watch } from "vue"
import { FormOptions } from "../../form/src/types/types"

const form = ref<FormInstance | null>()
//
const emits = defineEmits(['update:visible'])
const props = defineProps({
  isScroll: { // 是否只在可视区域内滚动
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  onChange: {
    type: Function
  },
  beforeUpload: {
    type: Function
  },
  onPreview: {
    type: Function
  },
  onRemove: {
    type: Function
  },
  beforeRemove: {
    type: Function
  },
  onSuccess: {
    type: Function
  },
  onExceed: {
    type: Function
  },
})


const dialogVisible = ref<boolean>(props.visible)

watch(()=>props.visible, (val)=>{
    dialogVisible.value = val
})
watch(()=>dialogVisible.value, (val)=>{
    emits('update:visible', val)
})

</script>
    
<style lang="scss" scoped>
</style>
     