<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-22 18:16:30
 * @Description:  
-->
<template>
    <mogo-form ref='form' label-width="100px" :options="options"
        @on-change="handleChange"
        @before-upload="handleBeforeUpload"
        @on-preview="handlePreview"
        @on-remove="handleRemove"
        @before-remove="beforeRemove"
        @on-success="handleSuccess"
        @on-exceed="handleExceed"
    >
        <template #uploadArea>
            <el-button size="small" type="primary">点击上传</el-button>
        </template>
        <template #uploadTip>
            <div style="color: #ccc;font-size: 12px; margin-left: 10px">文件小于500kb</div>
        </template>
        <template #action="scope">
            <el-button type="primary" @click="submitForm(scope)">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
        </template>
    </mogo-form>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus';
import { ref } from 'vue';
import { FormOptions } from '../../components/form/src/types/types';

const form = ref()

interface Scope {
    form: FormInstance,
    model: any
}
//
const options: FormOptions[] = [
    {
        type: 'input',
        value: '',
        label: '用户名',
        prop: 'username',
        placeholder: '请输入用户名',
        rules: [
            {
                required: true,
                message: '用户名不能为空',
                trigger: 'blur'
            },
            {
                min: 2,
                max: 6,
                message: '用户名在2-6之间',
                trigger: 'blur'
            },
        ],
        attrs: {
            clearable: true,
        }
    },
    {
        type: 'input',
        value: '',
        label: '密码',
        prop: 'password',
        placeholder: '请输入密码',
        rules: [
            {
                required: true,
                message: '密码不能为空',
                trigger: 'blur'
            },
            {
                min: 6,
                max: 15,
                message: '密码在6-15之间',
                trigger: 'blur'
            },
        ],
        attrs: {
            showPassword: true,
            clearable: true,
        }
    },
    {
        type: 'select',
        value: '',
        placeholder: '请选择职位',
        label: '职位',
        prop: 'role',
        rules: [{
            required: true,
            message: '职位不能为空',
            trigger: 'change'
        }],
        children: [
            {
                type: 'option',
                label: '经理',
                value: '1'
            },
            {
                type: 'option',
                label: '主管',
                value: '2'
            },
            {
                type: 'option',
                label: '员工',
                value: '3'
            },
        ],
        attrs: {
            clearable: true,
            style: {
                width: '100%'
            }
        }
    },
    {
        type: 'checkbox-group',
        value: [],
        prop: 'like',
        label: '爱好',
        // checkAll: true,
        // isAll: true,
        rules: [
            {
                required: true,
                message: '爱好不能为空',
                trigger: 'change'
            }
        ],
        children: [
            {
                type: 'checkbox',
                label: '足球',
                value: '1'
            },
            {
                type: 'checkbox',
                label: '篮球',
                value: '2'
            },
            {
                type: 'checkbox',
                label: '排球',
                value: '3'
            },
            
        ]
    },
    {
        type: 'radio-group',
        value: '',
        prop: 'gender',
        label: '性别',
        rules: [
            {
                required: true,
                message: '性别不能为空',
                trigger: 'change'
            }
        ],
        children: [
        {
            type: 'radio',
            label: '男',
            value: 'male'
        },
        {
            type: 'radio',
            label: '女',
            value: 'female'
        },
        {
            type: 'radio',
            label: '保密',
            value: 'not'
        }
        ]
    },
    {
        type: 'upload',
        label: '上传',
        prop: 'pic',
        uploadAttrs: {
            action: 'https://jsonplaceholder.typicode.com/posts/',
            multiple: true,
            limit: 3,
        },
        rules: [
            {
                required: true,
                message: '图片不能为空',
                trigger: 'change'
            }
        ],
    },
    {
        type: 'editor',
        value: '',
        prop: 'desc',
        label: '描述',
        placeholder: '请输入描述',
        rules: [
            {
                required: true,
                message: '描述不能为空',
                trigger: 'blur'
            }
        ]
    }
]

const handleChange = (val: any) => {
  console.log('change')
  console.log(val)
}
const handleBeforeUpload = (val: any) => {
  console.log('handleBeforeUpload')
  console.log(val)
}
const handlePreview = (file: any) => {
  console.log('handlePreview')
  console.log(file)
}
const handleRemove = (file: any, fileList: any) => {
  console.log('handleRemove')
  console.log(file, fileList)
}
const beforeRemove = (val: any) => {
  console.log('beforeRemove')
//   return ElMessageBox.confirm(`Cancel the transfort of ${val.file.name} ?`)
}
const handleSuccess = (val: any) => {
  console.log('handleSuccess')
  console.log(val)
}
const handleExceed = (val: any) => {
  console.log('handleExceed', val)
//   ElMessage.warning(
//     `The limit is 3, you selected ${val.files.length} files this time, add up to ${val.files.length + val.fileList.length} totally`
//   )
}

const submitForm = (scope: Scope) => {
    scope.form.validate((valid)=>{
        if (valid) {
            ElMessage.success('表单校验成功')
        } else {
            ElMessage.error('表单填写有误')
        }
    })
}
const resetForm = () => {
    form.value.resetFields()
}
</script>
    
<style lang="scss" scoped>
</style>
     