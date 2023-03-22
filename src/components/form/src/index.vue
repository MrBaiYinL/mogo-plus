<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-22 18:17:23
 * @Description:  
-->
<template>
    <el-form ref="form" v-if="model" :validate-on-rule-change="false" :model="model" :rules="rules" v-bind="$attrs">
        <template  v-for="(item, index) in options" :key="index">
            <el-form-item v-if="!item.children || !item.children.length" :prop="item.prop" :label="item.label">
                <component v-if="item.type !== 'upload' && item.type !== 'editor'" v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"  :placeholder="item.placeholder"></component>
                <el-upload 
                    ref="uploadRef"
                    v-if="item.type === 'upload'" 
                    v-bind="item.uploadAttrs"
                    :on-preview="onPreview"
                    :on-remove="onRemove"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :on-progress="onProgress"
                    :on-change="onChange"
                    :before-upload="beforeUpload"
                    :before-remove="beforeRemove"
                    :http-request="httpRequest"
                    :on-exceed="onExceed"
                >
                    <slot name="uploadArea"></slot>
                    <slot name="uploadTip"></slot>
                </el-upload>
                <div v-if="item.type === 'editor'" id="editor" @onChange="handleEditor"></div>
            </el-form-item>
            
            <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
                <component v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"  :placeholder="item.placeholder">
                    <component v-for="(child, i) in item.children" :key="i" :value="child.value" :label="child.label" :is="`el-${child.type}`">
                    </component>
                </component>
            </el-form-item>
        </template>
        <el-form-item>
            <!-- 作用域插槽：子组件通过插槽的形式，分发数据给父组件 *********很重要-->
            <slot name="action" :form="form" :model="model"></slot>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { nextTick, onMounted, PropType, ref, watch } from "vue";
import { cloneDeep } from "lodash";
import { FormInstance } from "element-plus";
import E from 'wangeditor'
import { FormOptions } from "./types/types";


const emits = defineEmits([
    'on-preview',
    'on-remove',
    'on-success',
    'on-error',
    'on-progress',
    'on-change',
    'before-upload',
    'before-remove',
    'on-exceed',
])
//
const props = defineProps({
    options: {
        type: Array as PropType<FormOptions[]>,
        required: true
    },
    // 自定义上传方法
    httpRequest: {
        type: Function
    }
})

const model = ref<any>(null)
const rules = ref<any>(null)
const form =  ref<FormInstance | null>()
const uploadRef = ref()
const edit =  ref()


// 初始化表单
const initForm = () => {
    if (props.options && props.options.length) {
        let m: any = {}
        let r: any = {}
        props.options.map((item: FormOptions) => {
            m[item.prop!] = item.value
            r[item.prop!] = item.rules

            if (item.type === 'editor') {
                // 初始化富文本
                nextTick(()=>{
                    if (document.getElementById('editor')) {
                        const editor = new E('#editor')
                        editor.config.placeholder = item.placeholder!
                        editor.create()
                        // 初始化富文本的值
                        editor.txt.html(item.value) 
                        editor.config.onchange = (newHtml: string) => {
                            console.log('onchange', newHtml)
                            model.value[item.prop!] = newHtml
                            if (newHtml.length > 0) {
                                // 富文本编辑器内容非空时，移除校验提示
                                form.value!.clearValidate('desc')
                            }
                        }
                        edit.value = editor
                    }
                })
                
            }
        })
        model.value = cloneDeep(m)
        rules.value = cloneDeep(r)
    }
}
// 重置表单
const resetFields = () => {
    // 重置elemen-plus表单，
    form.value!.resetFields()
    // 清空上传历史文件列表
    uploadRef.value[0].clearFiles()
    edit.value.txt.clear()
    // 重置editor富文本编辑器的内容
    // 获取到富文本的配置项
    // if (props.options && props.options.length) {
    //     const editorItem = props.options.find(item => item.type === 'editor')
    //     edit.value.txt.html(editorItem?.value)
    //     // edit.value.txt.clear() // 清空内容
    // }
}
// 表单验证
const validate = () => {
    return form.value!.validate
}
// 获取表单数据
const getFormDate = () => {
    return model.value
}
// 分发方法：defineExpose 把组件上的属性和方法分发(暴露 )出去
defineExpose({
    resetFields,
    validate,
    getFormDate,  // 直接分发model.value，只能拿到初始值，表单信息变化时，拿不到最新的内容
})

onMounted(()=>{
    initForm()
})
watch(()=>props.options, ()=> {
    initForm()
}, {deep: true})

// 上传组件的所有方法
const onPreview = (file: File) => {
    //
    emits('on-preview', file)
}
const onRemove = (file: File, fileList: FileList) => {
    // 
    emits('on-remove', {file, fileList})
}
const onSuccess = (response: any, file: File, fileList: FileList) => {
    // 上传图片成功，给表单上传项赋值
    let uploadItem = props.options.find(item => item.type === 'upload')
    model.value[uploadItem?.prop!] = {response, file, fileList}
    // 上传成功后重新校验该字段
    // form.value!.validate()
    form.value!.clearValidate('upload')
    emits('on-success', {response, file, fileList})
}
const onError = (err: any, file: File, fileList: FileList) => {
    //
    emits('on-error', {err, file, fileList})
}
const onProgress = (event: any, file: File, fileList: FileList) => {
    //
    emits('on-progress', {event, file, fileList})
}
const onChange = (file: File, fileList: FileList) => {
    //
    emits('on-change', {file, fileList})
}
const beforeUpload = (file: File) => {
    //
    emits('before-upload', file)
}
const beforeRemove = (file: File, fileList: FileList) => {
    //
    emits('before-remove', {file, fileList})
}
const onExceed = (files: File, fileList: FileList ) => {
    //
    emits('on-exceed', {files, fileList})
}

const handleEditor = () => {
    // 
    debugger
}
</script>
    
<style lang="scss" scoped>
</style> 
     