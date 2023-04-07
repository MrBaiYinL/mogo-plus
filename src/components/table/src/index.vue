<!--
 * @LastEditors: luoxiaolei
 * @LastEditTime: 2023-03-23 21:07:12
 * @Description:  
-->
<template>
    <el-table 
        v-bind="$attrs" :data="tableData" v-loading="isLoading"
        :element-loading-text="elementLoadingText"
        :element-loading-spinner="elementLoadingSpinner"
        :element-loading-background="elementLoadingBackground"
        :element-loading-svg="elementLoadingSvg"
        :element-loading-svg-view-box="elementLoadingSvgViewBox"
        @row-click="rowClick"
    >
        <template v-for="(item, index) in tableOptions" :key="index">
            <el-table-column :label="item.label" :prop="item.prop" :align="item.align" :width="item.width">
                <template #default="scope">
                    <template v-if="scope.row.rowEdit">
                        <el-input size="small" v-model="scope.row[item.prop]"></el-input>
                    </template>
                    <template v-else>
                        <template v-if="(scope.$index + scope.column.id === currentEdit)">
                            <div class="" style="display: flex">
                                <el-input size="small" v-model="scope.row[item.prop]"></el-input>
                                <div @click.stop="clickEditCell">
                                    <slot name="editCell" v-if="$slots.editCell" :scope="scope"></slot>
                                    <div class="icons" v-else>
                                        <el-icon-check class="check" @click="confirm(scope)"></el-icon-check>
                                        <el-icon-close class="close" @click="cancel(scope)"></el-icon-close>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
                            <span v-else>{{ scope.row[item.prop] }}</span>
                            <component :is="`el-icon-${ toLine(editIcon) }`"  class="edit" v-if="item.editable" @click.stop="clickEdit(scope)"></component>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </template>
        <el-table-column
            :label="actionOptions?.label" 
            :prop="actionOptions?.prop" 
            :align="actionOptions?.align" 
            :width="actionOptions?.width"
        >
            <template #default="scope">
                <slot name="editRow" v-if="scope.row.rowEdit"></slot>
                <slot name="action" :scope="scope" v-else ></slot>
            </template>
        </el-table-column>
    </el-table>
    <div v-if="pagination && !isLoading" class="pagination" :style="{ justifyContent }">
        <el-pagination
            :modelValue:currentPage="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
    </div>
</template>
<script lang="ts" setup>
import { PropType, computed, ref, onMounted, watch } from "vue";
import { TableOptions } from "./types";
import { toLine } from '../../../utils'
import { cloneDeep } from "lodash";
 
const props = defineProps({
  // 表格配置选项
    options: {
        type: Array as PropType<TableOptions[]>,
        required: true
    },
    // 表格数据
    data: {
        type: Array,
        required: true
    },
    // 加载文案
    elementLoadingText: {
        type: String,
    },
    // 加载图标名
    elementLoadingSpinner: {
        type: String,
    },
    // 加载背景颜色
    elementLoadingBackground: {
        type: String,
    },
    // 加载图标是svg
    elementLoadingSvg: {
        type: String
    },
    // 加载团是svg的配置
    elementLoadingSvgViewBox: {
        type: String,
    },
    // 编辑显示的图标
    editIcon: {
        type: String,
        default: 'Edit'
    },
    // 是否可以编辑行
    isEditRow: {
        type: Boolean,
        default: false
    },
    // 编辑行按钮的标识
    editRowIndex: {
        type: String,
        default: ''
    },
    // 是否显示分页
    pagination: {
        type: Boolean,
        default: true
    },
    // 显示分页的对齐方式
    paginationAlign: {
        type: String as PropType<'left' | 'center' | 'right'>,
        default: 'left'
    },
    // 当前是第几页
    currentPage: {
        type: Number,
        default: 1
    }, 
    // 当前一页多少条数据
    pageSize: {
        type: Number,
        default: 10
    },
    // 显示分页数据多少条的选项
    pageSizes: {
        type: Array,
        default: () => [5, 10, 20, 30, 40]
    },
    // 数据总条数
    total: {
        type: Number,
        default: 0
    }
})
// 当前点击单元格
const currentEdit = ref<string>('')
// 拷贝表格数据
const tableData = ref<any[]>(cloneDeep(props.data))
// 拷贝按钮标识
const cloneEditRowIndex = ref<string>(props.editRowIndex)

// 分发事件
const emits = defineEmits(['confirm', 'cancel', 'update:editRowIndex', 'size-change', 'current-change'])
// 监听父组件传递的数据
watch(()=>props.data, val=>{
    tableData.value = cloneDeep(val)
    tableData.value.map(item=>{
        // 是否是行可编辑状态
        item.rowEdit = false
    })
}, {deep: true})
// 监听父组件可编辑行标识
watch(()=>props.editRowIndex, val=>{
    if (val) {
        cloneEditRowIndex.value = val
    }
})

onMounted(()=>{
    tableData.value.map(item=>{
        // 是否是行可编辑状态
        item.rowEdit = false
    })
})

// 过滤操作选项之后的配置
const tableOptions = computed(()=>props.options.filter(item => !item.action))
// 找出操作项配置
const actionOptions = computed(()=>props.options.find(item => item.action))
// 
const isLoading = computed(()=> !props.data || !props.data.length)
// edit单元格
const clickEdit = (scope: any) => {
    // 唯一标识 
    currentEdit.value = scope.$index + scope.column.id
}

const clickEditCell = () => {
    currentEdit.value = ''
}
const confirm = (scope:any) => {
    emits('confirm', scope)
}
const cancel = (scope:any) => {
    emits('cancel', scope)
}
// 点击行
const rowClick = (row: any, column: any) => {
    // 判断当前点击是否是操作项的内容
    if (column.label === actionOptions.value?.label ) {
        // 编辑行的操作
        if (props.isEditRow && cloneEditRowIndex.value === props.editRowIndex) {
            // 点击的按钮是可编辑的操作
            row.rowEdit = !row.rowEdit
            // 重置其它数据的isEditRow
            tableData.value.forEach(item=> {
                if (item !== row) {
                    item.rowEdit = false
                }
            })
            // 重置按钮标识
            if(!row.rowEdit) {
                emits('update:editRowIndex', '')
            }
        }
    }
}


// 分页的每一页数据变化
const handleSizeChange = (val: number) => {
  emits('size-change', val)
  // console.log(val)
}
// 分页页数改变
const handleCurrentChange = (val: number) => {
  emits('current-change', val)
  // console.log(val)
}
// 表格分页的排列方式
let justifyContent = computed(() => {
  if (props.paginationAlign === 'left') return 'flex-start'
  else if (props.paginationAlign === 'right') return 'flex-end'
  else return 'center'
})

</script>
    
<style lang="scss" scoped>
.edit{
    width: 1em;
    height: 1em;
    position: relative;
    top:2px;
    left: 4px;
    cursor: pointer;
}
.icons{
    display: flex;
    position: relative;
    top: 5px;
    cursor: pointer;
    svg {
        width: 1em;
        height: 1em;
        margin-left: 8px;
    }
    .check {
        color: red;
    }
    .close {
        color: green;
    }
}
.pagination {
  margin-top: 16px;
  display: flex;
}
</style>
     